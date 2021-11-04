import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth, provider } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useHistory } from 'react-router';

const CopyRight = (props: any) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright ©'} Dental Agenda {new Date().getFullYear()}
        </Typography>
    );
};

const Login: React.FC = () => {
    const history = useHistory();
    const loggedUser = useSelector((state: RootState) => state.loggedUser);
    const { loggedIn } = loggedUser;

    const handleGoogleLogin = async (): Promise<void> => {
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.log('handleGoogleLogin function failed to execute', error);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            history.push('/dashboard');
        }
    }, [loggedIn, history]);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Agenda Dental
                    </Typography>
                </Box>
                <Button
                    data-testid="login-btn"
                    onClick={handleGoogleLogin}
                    variant="contained"
                    size="large"
                    startIcon={<GoogleIcon />}
                >
                    {`Iniciar Sesión Con Google`}
                </Button>
                <CopyRight sx={{ mt: 5 }} />
            </Grid>
        </Grid>
    );
};

export default Login;
