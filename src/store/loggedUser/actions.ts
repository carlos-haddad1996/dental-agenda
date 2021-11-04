import {
    ADD_LOGGED_USER,
    REMOVE_LOGGED_USER,
    LoggedUserState,
    LoggedUserActionTypes,
} from './types';

export function addLoggedUser(
    loggedUser: LoggedUserState
): LoggedUserActionTypes {
    return {
        type: ADD_LOGGED_USER,
        payload: loggedUser,
    };
}

export function removeLoggedUser(): LoggedUserActionTypes {
    return {
        type: REMOVE_LOGGED_USER,
    };
}
