interface Stores {
    actions: StringKeyObject;
    mutations: StringKeyObject;
    states: unknown;
    getters: StringKeyObject;
}
interface StringKeyObject {
    [key: string]: any;
}
/**
 * SimpleStateStore class
 */
export default class SimpleStateManagement {
    private events;
    private actions;
    private mutations;
    private states;
    private getters_;
    constructor(stores: Stores);
    /**
     * Dispatch action event
     */
    dispatch(actionName: string, payload?: StringKeyObject): Promise<unknown>;
    /**
     * Commit that modifies the states
     */
    commit(mutationName: string, payload?: StringKeyObject): void;
    /**
     * Get state
     */
    getters(getterName: string, payload?: StringKeyObject): unknown;
    /**
     * Subscribe event
     */
    subscribe(eventName: string, callback: () => void): () => void;
}
export {};
