interface Stores {
  actions: Store<ActionKeys, NestedActions>
  mutations: Store<MuationKeys, NestedMutaions>,
  states: unknown,
  getters: Store<GetterKeys, NestedGetters>
}
type Store<T, U> = StoreKeys<T> | NestedStore<U>;
interface StoreKeys<T> {
  [key :string]: T;
}
interface NestedStore<U> {
  [key :string]: U
}
interface ActionKeys {
  [key :string]: Action
}
interface Action {
  (context: ActionContext, payload: Payload): Promise<unknown>
}
interface ActionContext {
  commit: (key: string, payload: Payload) => void,
  getters: (key: string, payload: Payload) => unknown,
}
interface NestedActions {
  [key :string]: Store<ActionKeys, NestedActions>
}
interface MuationKeys {
  [key :string]: Mutation
}
interface Mutation {
  (context: MutationContext, payload: Payload): string
}
interface MutationContext {
  states: unknown
}
interface NestedMutaions {
  [key :string]: Store<MuationKeys, NestedMutaions>
}
interface GetterKeys {
  [key :string]: Getter
}
interface Getter {
  (context: GetterContext, payload: Payload): unknown
}
interface GetterContext {
  states: unknown
}
interface NestedGetters {
  [key :string]: Store<GetterKeys, NestedGetters>
}
interface Events {
  [key :string]: Array<() => void>;
}
interface Payload {
  [key: string]: unknown
}

interface StringKeyObj {
  [key: string]: any
}

/**
 * Find "nested" object
 */
const findNestedObj = <T>(obj: StringKeyObj, prop: string): T => {
  const paths = prop.split('.');
  const location = paths.reduce((object, path) => {
      return (object || {})[path];
  }, obj);
  return location;
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
  private actions: Store<ActionKeys, NestedActions>;
  private mutations: Store<MuationKeys, NestedMutaions>;
  private states: unknown;
  private _getters: Store<GetterKeys, NestedGetters>;
  constructor(stores: Stores) {
    const {actions, mutations, states, getters} = stores;
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
  public dispatch(key: string, payload: Payload): Promise<unknown> {
    const action = findNestedObj<Action>(this.actions, key);
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
   * Commit that modifies the statesZZ
   */
  public commit(key: string, payload: Payload): void {
    const mutation = findNestedObj<Mutation>(this.mutations, key);
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
  public getters(key: string, payload: Payload): unknown {
    const getter = findNestedObj<Getter>(this._getters, key);
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
