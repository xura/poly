import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";

import * as actions from "../actions";
import reducers, { TRootState } from "../reducers";
import epics from '../epics';
import { TActions, requestActions, entityActions } from "../actions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const epicMiddleware = createEpicMiddleware<
    TActions,
    TActions,
    TRootState
>();
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState: TRootState = { entities: {} }) {
    const middlewares = [
        epicMiddleware,
    ];
    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
    );
    return createStore(
        reducers,
        initialState,
        enhancer
    );
}

const store = configureStore();

epicMiddleware.run(epics);

// @ts-ignore
window.store = {
    store: store,
    requestActions: requestActions,
    entityActions: entityActions
}

export { store, actions };
