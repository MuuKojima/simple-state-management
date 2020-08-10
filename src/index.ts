type Roles = {
  actions: Actions,
  mutations: Mutaions,
  states: unknown,
  getters: Getters
}

type Actions = {
  [key :string]: Action
}

type Action = {
  (context: ActionContext, payload: unknown): Promise<unknown>
}

type ActionContext = {
  commit: (key: string, payload: unknown) => void,
  getters: (key: string, payload: unknown) => unknown,
}

type Mutaions = {
  [key :string]: Mutation
}

type Mutation = {
  (context: MutationContext, payload: unknown): string
}

type MutationContext = {
  states: unknown
}

type Getters = {
  [key :string]: Getter
}

type Getter = {
  (context: GetterContext, payload: unknown): unknown
}

type GetterContext = {
  states: unknown
}

type Events = {
  [key :string]: Array<() => void>;
}

/**
 * Find "nested" object property
 * @see https://github.com/mout/mout/blob/master/src/object/get.js
 */
const findNestedObjByProp = <T>(obj: {[key :string]: any}, prop: string): T | null => {
  if (!obj) {
    return null;
  }
  const parts = prop.split('.');
  const last = parts.pop() || '';
  while ((prop = parts.shift() || '')) {
    obj = obj[prop];
    if (!obj) {
      return null;
    }
  }
  return obj[last];
};

/**
 * Publish and Subscribe class
 */
class PubSub {
  private events: Events;

  constructor() {
    this.events = {};
  }

  /**
   * Subscribe event
   */
  public subscribe(eventName: string, callback: () => void): () => void {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    const unsubscribe = () => {
      this.events[eventName] = this.events[eventName].filter(
        (event: () => void) => callback !== event
      );
    };
    return unsubscribe;
  }

  /**
   * Publish the event
   */
  public publish(eventName: string): void {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      return;
    }
    this.events[eventName].forEach(callback => callback());
  }
}

/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
  private events: PubSub;
  private actions: Actions;
  private mutations: Mutaions;
  private states: unknown;
  private _getters: Getters;

  constructor(roles: Roles) {
    const {actions, mutations, states, getters} = roles;
    if (!actions || !mutations || !states || !getters) {
      throw new Error('You must add actions, mutations, states, getters');
    }
    this.events = new PubSub();
    this.actions = actions;
    this.mutations = mutations;
    this.states = states;
    this._getters = getters;
  }

  /**
   * Dispatch action event
   */
  public dispatch(key: string, payload: unknown = {}): Promise<unknown> {
    const action = findNestedObjByProp<Action>(this.actions, key);
    if (typeof action !== 'function') {
      console.error(`Action key doesn't exist => ${key}`);
      return window.Promise.reject();
    }
    const context: ActionContext = {
      commit: this.commit.bind(this),
      getters: this.getters.bind(this)
    };
    return action(context, payload);
  }

  /**
   * Commit that modifies the states
   */
  public commit(key: string, payload: unknown = {}): void {
    const mutation = findNestedObjByProp<Mutation>(this.mutations, key);
    if (typeof mutation !== 'function') {
      console.error(`Mutation key doesn't exist => ${key}`);
      return;
    }
    const context: MutationContext = {
      states: this.states
    };
    const eventName = mutation(context, payload);
    this.events.publish(eventName);
  }

  /**
   * Get target state value by key
   */
  public getters(key: string, payload: unknown = {}): unknown {
    const getter = findNestedObjByProp<Getter>(this._getters, key);
    if (typeof getter !== 'function') {
      console.error(`Getter key doesn't exist => ${key}`);
      return;
    }
    const context: GetterContext = {
      states: this.states
    };
    return getter(context, payload);
  }

  /**
   * Subscribe event
   */
  public subscribe(eventName: string, callback: () => void): () => void {
    return this.events.subscribe(eventName, callback);
  }
}
