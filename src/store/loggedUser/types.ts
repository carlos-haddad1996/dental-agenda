export const ADD_LOGGED_USER = 'ADD_LOGGED_USER';
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';

export interface LoggedUserState {
    loggedIn: boolean;
    email: string;
    fullName: string;
    photoUrl: string;
    userId: string;
}

export interface AddLoggedUserAction {
    type: typeof ADD_LOGGED_USER;
    payload: LoggedUserState;
}

export interface RemoveLoggedUserAction {
    type: typeof REMOVE_LOGGED_USER;
}

export type LoggedUserActionTypes =
    | AddLoggedUserAction
    | RemoveLoggedUserAction;
