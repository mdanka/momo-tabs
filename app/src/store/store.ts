import { loggingMiddleware, createStore, StoreEnhancer } from "redoodle";
import { applyMiddleware } from "redux";
import { appReducer } from "./reducers";
import { IAppState } from "./state";

const INITIAL_STATE: IAppState = {
    currentUser: undefined,
};

function createAppStore() {
    const middlewareEnhancer = applyMiddleware(loggingMiddleware()) as StoreEnhancer;
    const store = createStore<IAppState>(appReducer, INITIAL_STATE, middlewareEnhancer);
    return store;
}

export const STORE = createAppStore();
