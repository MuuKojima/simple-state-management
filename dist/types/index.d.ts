/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
    _events: any;
    _actions: any;
    _mutations: any;
    _states: any;
    _getters: any;
    constructor(roles: any);
    /**
     * Dispatch action event
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Promise<*>}
     */
    dispatch(key: any, payload: any): any;
    /**
     * Commit that modifies the states
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Void}
     */
    commit(key: any, payload: any): void;
    /**
     * Get state
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Object|string|number|boolean}
     */
    getters(key: any, payload: any): any;
    /**
     * Subscribe event
     * @param {string} event
     * @param {Function} callback
     * @returns {function} unsubscribe
     */
    subscribe(event: any, callback: any): any;
}
