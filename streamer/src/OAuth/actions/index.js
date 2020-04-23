import {SIGN_IN, SIGN_OUT} from '../../types';

export const signIn = (uid, username) => {
    return {
        type:SIGN_IN,
        payload: {uid, username}
    };
};

export const signOut = (uid) => {
    return {
        type:SIGN_OUT,
        payload: {uid, username:""}
    };
};