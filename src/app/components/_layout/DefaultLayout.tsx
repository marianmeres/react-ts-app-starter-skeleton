import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as classnames from 'classnames';
import { RootState } from '../../reducer';
import { authSelectors } from '../../../modules/auth/redux/index';
import './DefaultLayout.css';
import { config } from '../../config/config';
import { Header } from '../_header/Header';
import { Nav } from '../_nav/Nav';
import { RouteProps } from '../../types';

interface DefaultLayoutProps extends RouteProps {
    isAuthenticated?: boolean;
    mainComponent?: any;
    className?: string;
}

interface DefaultLayoutState {
}

interface DefaultLayoutSegments {
    header: any;
    main: any;
}

class DefaultLayoutClass extends React.Component<DefaultLayoutProps, DefaultLayoutState> {

    _segments(): DefaultLayoutSegments {
        let map = {} as any;
        React.Children.forEach(this.props.children, (child: any) => {
            if (child.props.label) {
                if (map[child.props.label]) {
                    console.warn(`Layout segment labeled as '${child.props.label}' already defined.`);
                } else {
                    map[child.props.label] = child.props.children;
                }
            } else {
                console.warn(`Expecting layout segment with 'label' prop.`);
            }
        });
        return map;
    }

    render() {
        let B = config.css.B('-layout');
        let segments = this._segments();

        return (
            <section className={classnames(B)}>
                <div className={classnames(`${B}-headerbox`)}>
                    {segments.header || <Header />}
                </div>
                <div className={classnames(`${B}-mainbox`)}>
                    {segments.main}
                </div>
                <Nav isAuthenticated={this.props.isAuthenticated} currentPath={this.props.location.pathname}/>
            </section>
        );
    }
}

function mapStateToProps(state: RootState, ownProps = {}): DefaultLayoutProps {
    return {
        isAuthenticated: authSelectors.identity.isAuthenticated(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps = {}): DefaultLayoutProps => ({

});

export const DefaultLayout = withRouter(
    connect<any, any, DefaultLayoutProps>(mapStateToProps, mapDispatchToProps)(DefaultLayoutClass)
);