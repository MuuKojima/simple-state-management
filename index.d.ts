declare type Roles = {
    actions: Actions;
    mutations: Mutaions;
    states: object;
    getters: Getters;
};
declare type Actions = {
    [key: string]: Action;
};
declare type Action = {
    (context: ActionContext, payload: object): Promise<any>;
};
declare type ActionContext = {
    commit: (key: string, payload: object) => void;
    getters: (key: string, payload: object) => any;
};
declare type Mutaions = {
    [key: string]: Mutation;
};
declare type Mutation = {
    (states: MutationContext, payload: object): string;
};
declare type MutationContext = {
    states: object;
};
declare type Getters = {
    [key: string]: Getter;
};
declare type Getter = {
    (context: GetterContext, payload: object): any;
};
declare type GetterContext = {
    states: object;
};
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
     */
    dispatch(key: string, payload?: object): Promise<any>;
    /**
     * Commit that modifies the states
     */
    commit(key: string, payload: object): void;
    /**
     * Get target state value by key
     */
    getters(key: string, payload: object): any;
    /**
     * Subscribe event
     */
    subscribe(eventName: string, callback: () => void): () => void;
}
export {};
