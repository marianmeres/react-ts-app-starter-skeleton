import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import * as classnames from 'classnames';
import { IdentityData } from '../../../modules/auth/models/Identity';
import { config } from '../../config/config';
import {
    identityActionCreators,
    identitySelectors
} from '../../../modules/auth/redux/identity';
import { DefaultLayout } from '../_layout/DefaultLayout';
import { LayoutSegment } from '../_layout/LayoutSegment';
import { RootState } from '../../reducer';
import { authActions, authSelectors } from '../../../modules/auth/redux/index';
import { RouteProps } from '../../types';

interface FooPageProps extends RouteProps {
    isAuthenticated?: boolean;
    identity?: IdentityData;
    dispatch?: (action) => void;

}

interface FooPageState {
    redirectTo?: string | null;
}

class FooPageContainer extends React.Component<FooPageProps, FooPageState> {

    state = {
        redirectTo: null,
    };

    componentDidMount() {
        this.props.dispatch(authActions.identity.setIdentity(null));
    }

    redirectTo(path, cb?) {
        this.setState({redirectTo: path}, cb);
    }

    render() {

        let B = config.css.B('-homepage');
        // console.log(this.props.identity, this.props.isAuthenticated);

        if (this.state.redirectTo) {
            return <Redirect push={true} to={this.state.redirectTo}/>;
        }

        return (
            <DefaultLayout>

                <LayoutSegment label="main">
                    <div className={classnames(B)}>
                        Page {this.props.location.pathname}
                    </div>
                </LayoutSegment>

            </DefaultLayout>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps = {}): FooPageProps => ({
    isAuthenticated: authSelectors.identity.isAuthenticated(state),
    identity: identitySelectors.getIdentity(state),
});

const mapDispatchToProps = (dispatch, ownProps = {}): FooPageProps => ({
    dispatch,
});

export const FooPage = withRouter(
    connect<any, any, FooPageProps>(mapStateToProps, mapDispatchToProps)(FooPageContainer)
);