type Roles = {
  actions: Actions,
  mutations: Mutaions,
  states: object,
  getters: Getters
}

type Actions = {
  [key :string]: Action
}

type Action = {
  (context: ActionContext, payload: object): Promise<any>
}

type ActionContext = {
  commit: (key: string, payload: object) => void,
  getters: (key: string, payload: object) => any,
}

type Mutaions = {
  [key :string]: Mutation
}

type Mutation = {
  (states: MutationContext, payload: object): string
}

type MutationContext = {
  states: object
}

type Getters = {
  [key :string]: Getter
}

type Getter = {
  (context: GetterContext, payload: object): any
}

type GetterContext = {
  states: object
}

type Events = {
  [key :string]: Array<() => void>;
}

/**
 * Find target function from nested object
 */
const findFuncFromNestedObjByKey = <T>(obj: any, key: string): T | undefined => {
  if (!obj) {
    return;
  }
  const parts = key.split('.');
  const last = parts.pop() || '';
  while ((key = parts.shift() || '')) {
    obj = obj[key];
    if (!obj) {
      return;
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
  private states: object;
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
  public dispatch(key: string, payload: object = {}): Promise<any> {
    const action = findFuncFromNestedObjByKey<Action>(this.actions, key);
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
  public commit(key: string, payload: object): void {
    const mutation = findFuncFromNestedObjByKey<Mutation>(this.mutations, key);
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
  public getters(key: string, payload: object): any {
    const getter = findFuncFromNestedObjByKey<Getter>(this._getters, key);
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
