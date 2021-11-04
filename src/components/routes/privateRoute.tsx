import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../store';
import { RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
    componentName: string;
}

export const PrivateRoute = ({
    component: Component,
    componentName,
    ...rest
}: PrivateRouteProps) => {
    const loggedUser = useSelector(
        (state: RootState) => state.loggedUser.loggedIn
    );

    if (!loggedUser) {
        return <Redirect to="/login" />;
    }

    return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
