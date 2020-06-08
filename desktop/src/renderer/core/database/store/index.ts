import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ActionType } from "typesafe-actions";

import * as actions from "../actions/entity.actions";
import reducers, { TRootState } from "../reducers";

export type ActionsType = ActionType<typeof actions>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const epicMiddleware = createEpicMiddleware<
    ActionsType,
    ActionsType,
    TRootState
>();
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState?: TRootState) {
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

// epicMiddleware.run(epics);

export { store, actions };
