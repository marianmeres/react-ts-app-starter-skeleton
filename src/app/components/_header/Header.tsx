import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as classnames from 'classnames';
import { windowSelectors, WindowState } from '../../redux/window';
import { IdentityData } from '../../../modules/auth/models/Identity';
import { config } from '../../config/config';
import { RootState } from '../../reducer';
import { identitySelectors } from '../../../modules/auth/redux/identity';
import './Header.css';

interface HeaderProps {
    title?: string;
    window?: WindowState;
    identity?: IdentityData;
    backUrl?: string;
    //
    dispatch?: (action) => any;
}

interface HeaderState {}

class HeaderClass extends React.Component<HeaderProps, HeaderState> {

    // pouzije sa pri `undefined`, nie `null`
    static defaultProps: HeaderProps = {
        title: 'Foo',
    };

    render() {
        let B = config.css.B('-header');
        let { identity, title, backUrl } = this.props;

        // quick-n-dirty
        // let title = 'Welcome in Super Hotel!';
        // if (identity && identity.user_id) {
        //     title = `Room #${identity.user_id}`;
        // }

        return (
            <header className={classnames(B)}>
                header
                {/*<div className="_icon-placeholder _left"><span>*/}
                    {/*{backUrl && <Link to={backUrl}>&#9668;</Link>}*/}
                {/*</span></div>*/}
                {/*<h1>{title}</h1>*/}
                {/*<div className="_icon-placeholder _right" title="Connection status">*/}

                {/*</div>*/}
            </header>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps = {}): HeaderProps => ({
    window: windowSelectors.getWindowDimensions(state),
    identity: identitySelectors.getIdentity(state),
});

const mapDispatchToProps = (dispatch, ownProps = {}): HeaderProps => ({
    dispatch,
});

export const Header = withRouter(
    connect<any, any, HeaderProps>(mapStateToProps, mapDispatchToProps)(HeaderClass)
);
