import React from 'react';
import {
    Route,
    Router,
    Redirect,
    BrowserRouter,
    Switch,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserHistory } from 'history';
import Login from '../../containers/Login';
import Dashboard from '../../containers/Dashboard';

const browserHistory = createBrowserHistory();

const AppRoutes: React.FC = () => {
    const loadRoutes = () => {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        );
    };

    return (
        <Router history={browserHistory}>
            <CssBaseline />
            {loadRoutes()}
        </Router>
    );
};

export default AppRoutes;
