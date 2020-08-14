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
 * Find "nested" object property
 * @see https://github.com/mout/mout/blob/master/src/object/get.js
 */
var findNestedObjByProp = function findNestedObjByProp(obj, prop) {
  var parts = prop.split('.');
  var last = parts.pop() || '';

  while (prop = parts.shift() || '') {
    obj = obj[prop];
  }

  return obj[last];
};
/**
 * Publish and Subscribe class
 */


var PubSub = /*#__PURE__*/function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.events = {};
  }
  /**
   * Subscribe event
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
     */

  }, {
    key: "publish",
    value: function publish(eventName) {
      if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        return;
      }

      this.events[eventName].forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return PubSub;
}();
/**
 * SimpleStateManager class
 */


var SimpleStateManager = /*#__PURE__*/function () {
  function SimpleStateManager(stores) {
    _classCallCheck(this, SimpleStateManager);

    var actions = stores.actions,
        mutations = stores.mutations,
        states = stores.states,
        getters = stores.getters;

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


  _createClass(SimpleStateManager, [{
    key: "dispatch",
    value: function dispatch(key, payload) {
      var action = findNestedObjByProp(this.actions, key);

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
     */

  }, {
    key: "commit",
    value: function commit(key, payload) {
      var mutation = findNestedObjByProp(this.mutations, key);

      if (typeof mutation !== 'function') {
        console.error("Mutation key doesn't exist => ".concat(key));
        return;
      }

      var context = {
        states: this.states
      };
      var eventName = mutation(context, payload);
      this.events.publish(eventName);
    }
    /**
     * Get target state value by key
     */

  }, {
    key: "getters",
    value: function getters(key, payload) {
      var getter = findNestedObjByProp(this._getters, key);

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
