import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import * as H from 'history';
import PrivateRoute from './privateRoute';
import Login from '../../containers/Login';
import Dashboard from '../../containers/Dashboard';
import Auth from '../../containers/Auth/auth';

interface AppRouterProps {
    history: H.History;
}

const AppRoutes = ({ history }: AppRouterProps) => {
    return (
        <Auth>
            <Router history={history}>
                <CssBaseline />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute
                        path="/dashboard"
                        component={Dashboard}
                        componentName="Dashboard"
                    />
                </Switch>
            </Router>
        </Auth>
    );
};

export default AppRoutes;
