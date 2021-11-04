import { RootState } from '../index';
import { LoggedUserState } from './types';
import { castDraft } from 'immer';

export function getLoggedUser(state: RootState) {
    return castDraft(state.loggedUser);
}

export function isUserAuth(state: RootState) {
    return state.loggedUser.loggedIn;
}
