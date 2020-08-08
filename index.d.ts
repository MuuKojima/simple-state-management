interface Roles {
    actions: object;
    mutations: object;
    states: object;
    getters: object;
}
/**
 * SimpleStateManager class
 */
export default class SimpleStateManager {
    private events;
    private actions;
    private mutations;
    private states;
    private _getters;
    constructor(roles: Roles);
    /**
     * Dispatch action event
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Promise<*>}
     */
    dispatch(key: string, payload: any): Promise<any>;
    /**
     * Commit that modifies the states
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Void}
     */
    commit(key: string, payload: any): void;
    /**
     * Get state
     * @param {string} key
     * @param {Object|string|number|boolean} payload
     * @returns {Object|string|number|boolean}
     */
    getters(key: string, payload: any): any;
    /**
     * Subscribe event
     * @param {string} eventName
     * @param {Function} callback
     * @returns {Function} unsubscribe
     */
    subscribe(eventName: string, callback: any): any;
}
export {};
