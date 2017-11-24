import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import * as _debounce from 'lodash/debounce';
import { isRouteAuthOnly, ROUTE_HOME, RouteDescription, routes } from '../config/routes';
import { BrowserLocationObj, RouteProps } from '../types';
import { windowActionCreators } from '../redux/window';
import { config } from '../config/config';
import { authSelectors } from '../../modules/auth/redux/index';
import { renderWithTransition } from './_page-transitions/page-transitions';
import './App.css';


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
    isAuthenticated?: boolean;
    saveWindowDimensions?: (o: any) => void;
    previousLocation?: BrowserLocationObj;
}

interface AppContainerState {

}

let _previousLocation: BrowserLocationObj;

/**
 *
 */
class AppClass extends React.Component<AppContainerProps, AppContainerState> {

    protected _updateDimensions: () => void;

    protected _historyUnlisten;

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this._updateDimensions = _debounce(() => {
            this.props.saveWindowDimensions(_getViewportDimensions());
        }, 100);

        this.props.saveWindowDimensions(_getViewportDimensions()); // save now

        _previousLocation = this.props.location;
    }

    /**
     *
     */
    componentDidMount() {
        window.addEventListener('resize', this._updateDimensions);

        this._historyUnlisten = this.props.history.listen((location, action) => {
            _previousLocation = this.props.location;
            // console.warn(`${this.props.location.pathname} => ${location.pathname} (${action})`);
        });
    }

    /**
     *
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this._updateDimensions);
        this._historyUnlisten();
    }

    /**
     * @returns {any}
     */
    render() {
        // return this._renderPageSwitchBasic();
        // return this._renderPageSwitchWithTransition(PageTransitionStackPushOrPop);
        return renderWithTransition(this._renderSwitch(), {
            ...this.props, previousLocation: _previousLocation
        });
    }

    /**
     * @returns {any}
     * @private
     */
    _renderPageSwitchBasic() {
        let B = config.css.B('-top-container');
        // to transitions
        return (
            <div className={B}>{this._renderSwitch()}</div>
        );
    }

    /**
     * @returns {any}
     * @private
     */
    _renderSwitch() {
        return (
            <Switch location={this.props.location}>
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

export const App = withRouter(
    connect<any, any, AppContainerProps>(mapStateToProps, mapDispatchToProps)(AppClass)
);


// _renderPageSwitchWithTransition(CSSTransitionComponent) {
//
//     const B = config.css.B('-top-container');
//     const from = _previousLocation.pathname;
//     const to = this.props.location.pathname;
//     const { location } = this.props;
//
//     let pushOrPop = 'push';
//     if (from === '/foo/bar') {
//         pushOrPop = 'pop';
//     }
//
//     // KEY IS IMPORTANT...
//     // const transitionKey = location.key; // worse... (will transiation the same path)
//     const transitionKey = location.pathname; // better
//
//     // AND, UFF, THIS IS ABSOLUTELY CRITICAL to make it work the way we need to...
//     const childFactory = (Child) => React.cloneElement(Child, { pushOrPop });
//
//     return (
//         <TransitionGroup className={B} childFactory={childFactory}>
//             <CSSTransitionComponent
//                 key={transitionKey}
//                 pushOrPop={pushOrPop}
//                 {...this.props}
//             >
//                 {this._renderSwitch()}
//             </CSSTransitionComponent>
//         </TransitionGroup>
//     );
// }

// _renderPageSwitchWith(Transitioner) {
//
//     return (
//         <Transitioner previousLocation={_previousLocation} location={this.props.location}>
//             <Switch>
//                 {routes.map((route: RouteDescription, i) => {
//                     if (isRouteAuthOnly(route) && !this.props.isAuthenticated) {
//                         return <Route key={i} component={NotAuthenticated}/>;
//                     }
//                     return <Route key={i} {...route} />;
//                 })}
//                 <Route component={NoMatch}/>
//             </Switch>
//         </Transitioner>
//     );
// }