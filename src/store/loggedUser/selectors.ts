import { RootState } from '../index';
import { castDraft } from 'immer';

export function getLoggedUser(state: RootState) {
    return castDraft(state.loggedUser);
}

export function isUserAuth(state: RootState) {
    return state.loggedUser.loggedIn;
}
