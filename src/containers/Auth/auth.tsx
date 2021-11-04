import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/config';
import { addLoggedUser } from '../../store/loggedUser/actions';
import store from '../../store';
import { LoggedUserState } from '../../store/loggedUser/types';
import { RootState } from '../../store';

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userLoggedIn = useSelector(
        (state: RootState) => !!state.loggedUser.email
    );
    const [waitAuthCheck, setWaitAuthCheck] = useState(!userLoggedIn);

    useEffect(() => {
        const firebaseCheck = (): Promise<void> =>
            new Promise((resolve) =>
                auth.onAuthStateChanged(async (firebaseUser) => {
                    if (firebaseUser) {
                        try {
                            const loggedUser: LoggedUserState = {
                                loggedIn: true,
                                email: firebaseUser.email as string,
                                fullName: firebaseUser.displayName as string,
                                photoUrl: firebaseUser.photoURL as string,
                                userId: firebaseUser.uid as string,
                            };
                            store.dispatch(addLoggedUser(loggedUser));
                            resolve();
                        } catch (e) {
                            auth.signOut();
                            console.error(`error when trying to log in: ${e}`);
                            resolve();
                        }
                    }
                    resolve();
                })
            );
        let mounted = true;
        if (!userLoggedIn && waitAuthCheck) {
            // First mount (logging in)
            firebaseCheck().then(() => {
                if (mounted) setWaitAuthCheck(false);
            });
        }
        return () => {
            mounted = false;
        };
    }, [userLoggedIn, waitAuthCheck]);

    return waitAuthCheck ? <></> : <>{children}</>;
};
export default Auth;
