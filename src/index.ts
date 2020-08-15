interface Stores {
  actions: StringKeyObject
  mutations:StringKeyObject,
  states: unknown,
  getters: StringKeyObject
}

interface ActionContext {
  commit: (mutationName: string, payload: StringKeyObject) => void,
  getters: (getterName: string, payload: StringKeyObject) => unknown,
}

interface MutationContext {
  states: unknown
}

interface GetterContext {
  states: unknown
}

interface Events {
  [key :string]: Array<() => void>;
}

interface StringKeyObject {
  [key: string]: any
}

/**
 * Find "nested" object
 */
const findNestedObj = (obj: StringKeyObject, name: string): StringKeyObject => {
  const paths = name.split('.');
  return paths.reduce((object, path) => (object || {})[path], obj);
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
 * SimpleStateStore class
 */
export default class SimpleStateManagement {
  private events: PubSub;
  private actions: StringKeyObject;
  private mutations: StringKeyObject;
  private states: unknown;
  private getters_: StringKeyObject;
  constructor(stores: Stores) {
    const {actions, mutations, states, getters} = stores;
    if (!actions || !mutations || !states || !getters) {
      throw new Error('You must add actions, mutations, states, getters');
    }
    this.events = new PubSub();
    this.actions = actions;
    this.mutations = mutations;
    this.states = states;
    this.getters_ = getters;
  }
  /**
   * Dispatch action event
   */
  public dispatch(actionName: string, payload: StringKeyObject): Promise<unknown> {
    const action = findNestedObj(this.actions, actionName);
    if (typeof action !== 'function') {
      console.error(`Action: actionName doesn't exist => ${actionName}`);
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
  public commit(mutationName: string, payload: StringKeyObject): void {
    const mutation = findNestedObj(this.mutations, mutationName);
    if (typeof mutation !== 'function') {
      console.error(`Mutation: mutationName doesn't exist => ${mutationName}`);
      return;
    }
    const context: MutationContext = {
      states: this.states
    };
    const eventName = mutation(context, payload);
    this.events.publish(eventName);
  }
  /**
   * Get state
   */
  public getters(getterName: string, payload: StringKeyObject): unknown {
    const getter = findNestedObj(this.getters_, getterName);
    if (typeof getter !== 'function') {
      console.error(`Getter: getterName doesn't exist => ${getterName}`);
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
