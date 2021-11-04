import {
    ADD_LOGGED_USER,
    REMOVE_LOGGED_USER,
    LoggedUserState,
    LoggedUserActionTypes,
} from './types';

const loggedUserInitialState = {
    loggedIn: false,
    email: '',
    fullName: '',
    photoUrl: '',
    userId: '',
};

const loggedUserReducer = (
    state = loggedUserInitialState,
    action: LoggedUserActionTypes
): LoggedUserState => {
    switch (action.type) {
        case ADD_LOGGED_USER: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case REMOVE_LOGGED_USER: {
            return {
                ...state,
                ...loggedUserInitialState,
            };
        }
        default:
            return state;
    }
};

export default loggedUserReducer;
