function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Find `nested` object property
 * @param {Object} obj
 * @param {string} prop
 */
var findNestedObj = function findNestedObj(obj, prop) {
  if (!obj) {
    return;
  }

  var parts = prop.split('.');
  var last = parts.pop() || '';

  while (prop = parts.shift() || '') {
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


var PubSub = /*#__PURE__*/function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.events = {};
  }
  /**
   * Subscribe event
   * @param {string} eventName
   * @param {Function} callback
   * @returns {Function} unsubscribe
   */


  _createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      var _this = this;

      if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        this.events[eventName] = [];
      }

      this.events[eventName].push(callback);

      var unsubscribe = function unsubscribe() {
        _this.events[eventName] = _this.events[eventName].filter(function (event) {
          return callback !== event;
        });
      };

      return unsubscribe;
    }
    /**
     * Publish the event
     * @param {string} eventName
     * @param {Object} data
     * @param {Function}
     */

  }, {
    key: "publish",
    value: function publish(eventName) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        return;
      }

      this.events[eventName].map(function (callback) {
        return callback(payload);
      });
    }
  }]);

  return PubSub;
}();

/**
 * SimpleStateManager class
 */
var SimpleStateManager = /*#__PURE__*/function () {
  function SimpleStateManager(roles) {
    _classCallCheck(this, SimpleStateManager);

    var actions = roles.actions,
        mutations = roles.mutations,
        states = roles.states,
        getters = roles.getters;

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


  _createClass(SimpleStateManager, [{
    key: "dispatch",
    value: function dispatch(key, payload) {
      var action = findNestedObj(this.actions, key);

      if (typeof action !== 'function') {
        console.error("Action key doesn't exist => ".concat(key));
        return window.Promise.reject();
      }

      var context = {
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

  }, {
    key: "commit",
    value: function commit(key, payload) {
      var mutation = findNestedObj(this.mutations, key);

      if (typeof mutation !== 'function') {
        console.error("Mutation key doesn't exist => ".concat(key));
        return;
      }

      var publishKey = mutation(this.states, payload);
      this.events.publish(publishKey);
    }
    /**
     * Get state
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Object|string|number|boolean}
     */

  }, {
    key: "getters",
    value: function getters(key, payload) {
      var getter = findNestedObj(this._getters, key);

      if (typeof getter !== 'function') {
        console.error("Getter key doesn't exist => ".concat(key));
        return;
      }

      var context = {
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

  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      return this.events.subscribe(eventName, callback);
    }
  }]);

  return SimpleStateManager;
}();

export default SimpleStateManager;
