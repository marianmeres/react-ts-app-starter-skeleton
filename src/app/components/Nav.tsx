import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    isRouteAuthOnly, isRouteNotAuthOnly, RouteDescription,
    routes
} from '../config/routes';

export const Nav = ({ isAuthenticated }) => (
    <nav>
        <ul>
            {routes.map((route: RouteDescription, i) => {
                if (
                    (isRouteAuthOnly(route) && !isAuthenticated)
                    || (isRouteNotAuthOnly(route) && isAuthenticated)
                ) {
                    return null;
                }
                return <li key={i}><Link to={route.path}>{route.label}</Link></li>;
            })}
        </ul>
    </nav>
);