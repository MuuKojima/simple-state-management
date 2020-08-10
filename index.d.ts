declare type Roles = {
    actions: Actions;
    mutations: Mutaions;
    states: unknown;
    getters: Getters;
};
declare type Actions = {
    [key: string]: Action;
};
declare type Action = {
    (context: ActionContext, payload: unknown): Promise<unknown>;
};
declare type ActionContext = {
    commit: (key: string, payload: unknown) => void;
    getters: (key: string, payload: unknown) => unknown;
};
declare type Mutaions = {
    [key: string]: Mutation;
};
declare type Mutation = {
    (context: MutationContext, payload: unknown): string;
};
declare type MutationContext = {
    states: unknown;
};
declare type Getters = {
    [key: string]: Getter;
};
declare type Getter = {
    (context: GetterContext, payload: unknown): unknown;
};
declare type GetterContext = {
    states: unknown;
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
    dispatch(key: string, payload?: unknown): Promise<unknown>;
    /**
     * Commit that modifies the states
     */
    commit(key: string, payload?: unknown): void;
    /**
     * Get target state value by key
     */
    getters(key: string, payload?: unknown): unknown;
    /**
     * Subscribe event
     */
    subscribe(eventName: string, callback: () => void): () => void;
}
export {};
