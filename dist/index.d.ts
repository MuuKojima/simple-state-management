interface Stores {
    actions: Store<ActionKeys, NestedActions>;
    mutations: Store<MuationKeys, NestedMutaions>;
    states: unknown;
    getters: Store<GetterKeys, NestedGetters>;
}
declare type Store<T, U> = StoreKeys<T> | NestedStore<U>;
interface StoreKeys<T> {
    [key: string]: T;
}
interface NestedStore<U> {
    [key: string]: U;
}
interface ActionKeys {
    [key: string]: Action;
}
interface Action {
    (context: ActionContext, payload: Payload): Promise<unknown>;
}
interface ActionContext {
    commit: (key: string, payload: Payload) => void;
    getters: (key: string, payload: Payload) => unknown;
}
interface NestedActions {
    [key: string]: Store<ActionKeys, NestedActions>;
}
interface MuationKeys {
    [key: string]: Mutation;
}
interface Mutation {
    (context: MutationContext, payload: Payload): string;
}
interface MutationContext {
    states: unknown;
}
interface NestedMutaions {
    [key: string]: Store<MuationKeys, NestedMutaions>;
}
interface GetterKeys {
    [key: string]: Getter;
}
interface Getter {
    (context: GetterContext, payload: Payload): unknown;
}
interface GetterContext {
    states: unknown;
}
interface NestedGetters {
    [key: string]: Store<GetterKeys, NestedGetters>;
}
interface Payload {
    [key: string]: unknown;
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
    constructor(stores: Stores);
    /**
     * Dispatch action event
     */
    dispatch(key: string, payload: Payload): Promise<unknown>;
    /**
     * Commit that modifies the statesZZ
     */
    commit(key: string, payload: Payload): void;
    /**
     * Get target state value by key
     */
    getters(key: string, payload: Payload): unknown;
    /**
     * Subscribe event
     */
    subscribe(eventName: string, callback: () => void): () => void;
}
export {};
