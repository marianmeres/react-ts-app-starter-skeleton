import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { reducer, RootState } from './reducer';

declare const window: any;

export function configureStore(initialState?: RootState) {

    const middlewares = [
        thunk,
        promiseMiddleware(),
    ];

    // logger must be last in stack
    if (process.env.NODE_ENV === `development`) {
        middlewares.push(createLogger({
            collapsed: (getState, action) => true
        }));
    }

    return createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}