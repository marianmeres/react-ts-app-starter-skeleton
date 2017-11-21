import * as React from 'react';
import { Route } from 'react-router-dom';

// https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202
export const withProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return React.createElement(component, finalProps);
};

export const RouteWithProps = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={(routeProps) => withProps(component, routeProps, rest)}/>
    );
};
