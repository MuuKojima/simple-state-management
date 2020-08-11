interface Roles {
    actions: Actions;
    mutations: Mutaions;
    states: unknown;
    getters: Getters;
}
interface Actions {
    [key: string]: Action;
}
interface Action {
    (context: ActionContext, payload: unknown): Promise<unknown>;
}
interface ActionContext {
    commit: (key: string, payload: unknown) => void;
    getters: (key: string, payload: unknown) => unknown;
}
interface Mutaions {
    [key: string]: Mutation;
}
interface Mutation {
    (context: MutationContext, payload: unknown): string;
}
interface MutationContext {
    states: unknown;
}
interface Getters {
    [key: string]: Getter;
}
interface Getter {
    (context: GetterContext, payload: unknown): unknown;
}
interface GetterContext {
    states: unknown;
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
