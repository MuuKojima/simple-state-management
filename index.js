/**
 * Find `nested` object property
 * @param {Object} obj
 * @param {String} prop
 */
const findNestedObj = (obj, prop) => {
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
  constructor() {
    this._events = {};
  }

  /**
   * Subscribe event
   * @param {string} eventName
   * @param {function} callback
   * @returns {function} unsubscribe
   */
  subscribe(eventName, callback) {
    if (!Object.prototype.hasOwnProperty.call(this._events, eventName)) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
    const unsubscribe = () => {
      this._events[eventName] = this._events[eventName].filter(
        event => callback !== event
      );
    };
    return unsubscribe;
  }

  /**
   * Publish the event
   * @param {string} event
   * @param {Object} data
   */
  publish(eventName, payload = {}) {
    if (!Object.prototype.hasOwnProperty.call(this._events, eventName)) {
      return [];
    }
    this._events[eventName].map(callback => callback(payload));
  }
}

/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
  constructor(roles) {
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
  dispatch(key, payload) {
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
  commit(key, payload) {
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
  getters(key, payload) {
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
  subscribe(event, callback) {
    return this._events.subscribe(event, callback);
  }
}
