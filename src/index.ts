/**
 * Find `nested` object property
 * @param {Object} obj
 * @param {string} prop
 */
const findNestedObj = (obj: any, prop: string) => {
  if (!obj) {
    return;
  }
  const parts = prop.split('.');
  const last = parts.pop() || '';
  while ((prop = parts.shift() || '')) {
    obj = obj[prop];
    if (!obj) {
      return;
    }
  }
  return obj[last];
};

/**
 * PubSub class
 */
class PubSub {
  private events: any;

  constructor() {
    this.events = {};
  }

  /**
   * Subscribe event
   * @param {string} eventName
   * @param {Function} callback
   * @returns {Function} unsubscribe
   */
  subscribe(eventName: string, callback: any): () => void {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    const unsubscribe = () => {
      this.events[eventName] = this.events[eventName].filter(
        (event: any) => callback !== event
      );
    };
    return unsubscribe;
  }

  /**
   * Publish the event
   * @param {string} eventName
   * @param {Object} data
   * @param {Function}
   */
  publish(eventName: string, payload = {}): void {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      return;
    }
    this.events[eventName].map((callback: any) => callback(payload));
  }
}

interface Roles {
  actions: object,
  mutations: object,
  states: object,
  getters: object
}

/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
  private events: any;
  private actions: any;
  private mutations: any;
  private states: any;
  private _getters: any;

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
   * @param {string} key
   * @param {Object|string|number|boolean} payload
   * @returns {Promise<*>}
   */
  public dispatch(key: string, payload: any): Promise<any> {
    const action = findNestedObj(this.actions, key);
    if (typeof action !== 'function') {
      console.error(`Action key doesn't exist => ${key}`);
      return window.Promise.reject();
    }
    const context = {
      commit: this.commit.bind(this),
      getters: this.getters.bind(this)
    };
    return action(context, payload);
  }

  /**
   * Commit that modifies the states
   * @param {string} key
   * @param {Object|string|number|boolean} payload
   * @returns {Void}
   */
  public commit(key: string, payload: any): void {
    const mutation = findNestedObj(this.mutations, key);
    if (typeof mutation !== 'function') {
      console.error(`Mutation key doesn't exist => ${key}`);
      return;
    }
    const publishKey = mutation(this.states, payload);
    this.events.publish(publishKey);
  }

  /**
   * Get state
   * @param {string} key
   * @param {Object|string|number|boolean} payload
   * @returns {Object|string|number|boolean}
   */
  public getters(key: string, payload: any) {
    const getter = findNestedObj(this._getters, key);
    if (typeof getter !== 'function') {
      console.error(`Getter key doesn't exist => ${key}`);
      return;
    }
    const context = {
      states: this.states
    };
    return getter(context, payload);
  }

  /**
   * Subscribe event
   * @param {string} eventName
   * @param {Function} callback
   * @returns {Function} unsubscribe
   */
  public subscribe(eventName: string, callback: any) {
    return this.events.subscribe(eventName, callback);
  }
}
