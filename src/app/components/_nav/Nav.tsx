import * as React from 'react';
import { Link } from 'react-router-dom';
import { isRouteAuthOnly, isRouteNotAuthOnly, RouteDescription, routes } from '../../config/routes';
import './Nav.css';

// https://codesandbox.io/s/8nBON3Ej
// const SafeLink = (props) => <Link {...props} replace={currPath === props.to} />;

export const Nav = ({ isAuthenticated, currentPath }) => (
    <nav>
        <ul>
            {routes.map((route: RouteDescription, i) => {
                if (
                    (isRouteAuthOnly(route) && !isAuthenticated)
                    || (isRouteNotAuthOnly(route) && isAuthenticated)
                ) {
                    return null;
                }

                // replace "trick": https://codesandbox.io/s/8nBON3Ej
                return (
                    <li key={i}>
                        <Link to={route.path} replace={currentPath === route.path}>
                            {route.label}
                        </Link>
                    </li>
                );
            })}
            <li><Link to="/404" replace={currentPath === '/404'}>404</Link></li>
        </ul>
    </nav>
);