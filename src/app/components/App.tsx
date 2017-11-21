import * as React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    withRouter,
    Redirect
} from 'react-router-dom';
import * as _debounce from 'lodash/debounce';
import {
    isRouteAuthOnly, ROUTE_HOME,
    ROUTE_LOGIN, RouteDescription, ROUTER_BASENAME, routes
} from '../config/routes';
import { RouteProps } from '../types';
import { windowActionCreators } from '../redux/window';
import { config } from '../config/config';
import { authSelectors } from '../../modules/auth/redux/index';

const NoMatch = () => (
    <div>Page not found. Continue to <Link to={ROUTE_HOME}>homepage</Link>.</div>
);

const NotAuthenticated = () => (
    <div>You must <Link to={ROUTE_HOME}>log in</Link> to continue!</div>
);

const _getViewportDimensions = () => ({
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
});

interface AppContainerProps extends RouteProps {
    isAuthenticated: boolean;
    saveWindowDimensions: (o: any) => void;
}

interface AppContainerState {

}

class AppClass extends React.Component<AppContainerProps, AppContainerState> {

    protected _updateDimensions: () => void;

    constructor(props) {
        super(props);

        this._updateDimensions = _debounce(() => {
            this.props.saveWindowDimensions(_getViewportDimensions());
        }, 100);

        this.props.saveWindowDimensions(_getViewportDimensions()); // save now
    }

    componentDidMount() {
        window.addEventListener('resize', this._updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateDimensions);
    }

    render() {

        let B = config.css.B('-top-container');

        return (
            <div className={B}>
                <Router basename={ROUTER_BASENAME}>
                    <Switch>
                        {routes.map((route: RouteDescription, i) => {
                            // note: toto sluzi aj ako kvazi security, ale jednotlive
                            // komponenty by sa nemali na toto spoliehat a osetrit si veci
                            // aj explicitnejsie ak treba
                            if (isRouteAuthOnly(route) && !this.props.isAuthenticated) {
                                return <Route key={i} component={NotAuthenticated}/>;
                            }
                            return <Route key={i} {...route} />;
                        })}
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => ({
    isAuthenticated: authSelectors.identity.isAuthenticated(state),
});

const mapDispatchToProps = (dispatch, ownProps = {}) => ({
    dispatch,
    saveWindowDimensions: (o) => dispatch(windowActionCreators.saveWindowDimensions(o))
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppClass);
