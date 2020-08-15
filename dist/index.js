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
 * Find "nested" object
 */
var findNestedObj = function findNestedObj(obj, name) {
  var paths = name.split('.');
  return paths.reduce(function (object, path) {
    return (object || {})[path];
  }, obj);
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
 * SimpleStateStore class
 */


var SimpleStateManagement = /*#__PURE__*/function () {
  function SimpleStateManagement(stores) {
    _classCallCheck(this, SimpleStateManagement);

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
    this.getters_ = getters;
  }
  /**
   * Dispatch action event
   */


  _createClass(SimpleStateManagement, [{
    key: "dispatch",
    value: function dispatch(actionName, payload) {
      var action = findNestedObj(this.actions, actionName);

      if (typeof action !== 'function') {
        console.error("Action: actionName doesn't exist => ".concat(actionName));
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
    value: function commit(mutationName, payload) {
      var mutation = findNestedObj(this.mutations, mutationName);

      if (typeof mutation !== 'function') {
        console.error("Mutation: mutationName doesn't exist => ".concat(mutationName));
        return;
      }

      var context = {
        states: this.states
      };
      var eventName = mutation(context, payload);
      this.events.publish(eventName);
    }
    /**
     * Get state
     */

  }, {
    key: "getters",
    value: function getters(getterName, payload) {
      var getter = findNestedObj(this.getters_, getterName);

      if (typeof getter !== 'function') {
        console.error("Getter: getterName doesn't exist => ".concat(getterName));
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

  return SimpleStateManagement;
}();

export default SimpleStateManagement;
