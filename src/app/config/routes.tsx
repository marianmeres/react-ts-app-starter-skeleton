import * as React from 'react';
import { IS_PRODUCTION } from './config';
import { HomePage } from '../components/page-home/HomePage';
import { FooPage } from '../components/page-foo/FooPage';

export const ROUTER_BASENAME = IS_PRODUCTION ? '/' : '/'; // dummy

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_LOGOUT = '/logout';

export interface RouteDescription {
    customRoute?: any;
    path: string;
    exact?: boolean;
    component: any;
    label: string;
    routeMeta?: {
        notAuthOnly?: boolean; // just signal to show/hide on ui... actual implementation is open...
        authOnly?: boolean; // just signal to show/hide on ui... actual implementation is open...
    };
}

export const isRouteAuthOnly = (route: RouteDescription) => (
    route.routeMeta && route.routeMeta.authOnly
);

export const isRouteNotAuthOnly = (route: RouteDescription) => (
    route.routeMeta && route.routeMeta.notAuthOnly
);

// top level routes only config
export const routes: RouteDescription[] = [
    {
        label: 'Home',
        path: ROUTE_HOME,
        exact: true,
        component: HomePage,
    }, {
        label: 'Foo',
        path: '/foo',
        exact: true,
        component: FooPage,
    },
    {
        label: 'Bar',
        path: '/foo/bar',
        exact: true,
        component: FooPage,
    },
    {
        label: 'Baz',
        path: '/foo/bar/baz',
        exact: true,
        component: FooPage,
    },
    {
        label: 'Bat',
        path: '/bat',
        exact: true,
        component: FooPage,
    },
];