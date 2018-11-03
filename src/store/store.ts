import { loggingMiddleware, createStore, StoreEnhancer } from "redoodle";
import { applyMiddleware } from "redux";
import { appReducer } from "./reducers";
import { IAppState } from "./state";

const INITIAL_STATE: IAppState = {
    currentUser: undefined,
    songs: {},
};

export function createAppStore(initialStateMaybe?: IAppState) {
    const initialState = initialStateMaybe === undefined ? INITIAL_STATE : initialStateMaybe;
    const middlewareEnhancer = applyMiddleware(loggingMiddleware()) as StoreEnhancer;
    const store = createStore<IAppState>(appReducer, initialState, middlewareEnhancer);
    return store;
}
