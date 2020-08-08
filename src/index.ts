/**
 * Find `nested` object property
 * @param {Object} obj
 * @param {String} prop
 */
const findNestedObj = (obj: any, prop: any) => {
  if (!obj) {
    return;
  }
  const parts = prop.split('.');
  const last = parts.pop();
  while ((prop = parts.shift())) {
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
  _events: any;

  constructor() {
    this._events = {};
  }

  /**
   * Subscribe event
   * @param {string} eventName
   * @param {function} callback
   * @returns {function} unsubscribe
   */
  subscribe(eventName: any, callback: any) {
    if (!Object.prototype.hasOwnProperty.call(this._events, eventName)) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
    const unsubscribe = () => {
      this._events[eventName] = this._events[eventName].filter(
        (event: any) => callback !== event
      );
    };
    return unsubscribe;
  }

  /**
   * Publish the event
   * @param {string} event
   * @param {Object} data
   */
  publish(eventName: any, payload = {}) {
    if (!Object.prototype.hasOwnProperty.call(this._events, eventName)) {
      return [];
    }
    return this._events[eventName].map((callback: any) => callback(payload));
  }
}

/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
  _events: any;
  _actions: any;
  _mutations: any;
  _states: any;
  _getters: any;

  constructor(roles: any) {
    const {actions, mutations, states, getters} = roles;
    if (!actions || !mutations || !states || !getters) {
      throw new Error('You must add actions, mutations, states, getters');
    }
    this._events = new PubSub();
    this._actions = actions;
    this._mutations = mutations;
    this._states = states;
    this._getters = getters;
  }

  /**
   * Dispatch action event
   * @param {string} key
   * @param {Object|string|number|boolean} payload
   * @returns {Promise<*>}
   */
  dispatch(key: any, payload: any) {
    const action = findNestedObj(this._actions, key);
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
  commit(key: any, payload: any) {
    const mutation = findNestedObj(this._mutations, key);
    if (typeof mutation !== 'function') {
      console.error(`Mutation key doesn't exist => ${key}`);
      return;
    }
    const publishKey = mutation(this._states, payload);
    this._events.publish(publishKey);
  }

  /**
   * Get state
   * @param {string} key
   * @param {Object|string|number|boolean} payload
   * @returns {Object|string|number|boolean}
   */
  getters(key: any, payload: any) {
    const getter = findNestedObj(this._getters, key);
    if (typeof getter !== 'function') {
      console.error(`Getter key doesn't exist => ${key}`);
      return;
    }
    const context = {
      states: this._states
    };
    return getter(context, payload);
  }

  /**
   * Subscribe event
   * @param {string} event
   * @param {Function} callback
   * @returns {function} unsubscribe
   */
  subscribe(event: any, callback: any) {
    return this._events.subscribe(event, callback);
  }
}
