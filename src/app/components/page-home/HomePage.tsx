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
import { Header } from '../_header/Header';
import './HomePage.css';

interface HomePageProps {
    isAuthenticated?: boolean;
    identity?: IdentityData;
    dispatch?: (action) => void;
}

interface HomePageState {
    redirectTo?: string | null;
}

class HomePageContainer extends React.Component<HomePageProps, HomePageState> {

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
        let { identity } = this.props;
        // console.log(this.props.identity, this.props.isAuthenticated);

        if (this.state.redirectTo) {
            return <Redirect push={true} to={this.state.redirectTo}/>;
        }

        return (
            <DefaultLayout>

                <LayoutSegment label="header">
                    <Header title={identity ? `Hello ${identity.first_name}!` : void(0)} />
                </LayoutSegment>

                <LayoutSegment label="main">
                    <div className={classnames(B)}>
                        HomePage
                    </div>
                </LayoutSegment>

            </DefaultLayout>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps = {}): HomePageProps => ({
    isAuthenticated: authSelectors.identity.isAuthenticated(state),
    identity: identitySelectors.getIdentity(state),
});

const mapDispatchToProps = (dispatch, ownProps = {}): HomePageProps => ({
    dispatch,
});

export const HomePage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
);