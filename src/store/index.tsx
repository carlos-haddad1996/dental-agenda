import {
    combineReducers,
    applyMiddleware,
    createStore,
    AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';

import { REMOVE_LOGGED_USER } from './loggedUser/types';
import { loggedUserReducer } from './loggedUser';

export const history = createBrowserHistory();

const logger = createLogger({
    level: 'info',
    collapsed: true,
});

const middlewares = applyMiddleware(
    reduxPromise,
    promiseMiddleware,
    routerMiddleware(history),
    thunkMiddleware,
    logger
);

const appReducer = combineReducers({
    router: connectRouter(history),
    loggedUser: loggedUserReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
    if (action.type === REMOVE_LOGGED_USER) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

const store = createStore(rootReducer, composeWithDevTools(middlewares));

export default store;
