import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase/config';

const Login: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleGoogleLogin = async (): Promise<void> => {
        try {
            await auth.signInWithPopup(provider);
            setLoggedIn(true);
        } catch (error) {
            console.log('handleGoogleLogin function failed to execute', error);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            console.log('User Logged In');
        }
    }, [loggedIn]);

    return (
        <>
            <div>
                <h2>Dental Agenda</h2>
                <button onClick={handleGoogleLogin}>Log In With Google</button>
            </div>
        </>
    );
};

export default Login;
