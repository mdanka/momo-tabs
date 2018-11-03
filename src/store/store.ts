import { loggingMiddleware, createStore, StoreEnhancer } from "redoodle";
import { applyMiddleware } from "redux";
import { appReducer } from "./reducers";
import { IAppState } from "./state";

export function createAppStore(initialState: IAppState) {
    const middlewareEnhancer = applyMiddleware(loggingMiddleware()) as StoreEnhancer;
    const store = createStore<IAppState>(appReducer, initialState, middlewareEnhancer);
    return store;
}
