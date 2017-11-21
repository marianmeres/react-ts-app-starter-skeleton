import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as classnames from 'classnames';
import { RootState } from '../../reducer';
import { authSelectors } from '../../../modules/auth/redux/index';
import './DefaultLayout.css';
import { config } from '../../config/config';
import { Header } from '../_header/Header';

interface DefaultLayoutProps {
    isAuthenticated: boolean;
    mainComponent: any;
    className?: string;
}

interface DefaultLayoutSegments {
    header: any;
    main: any;
}

class DefaultLayoutClass extends React.Component<DefaultLayoutProps, any> {

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
            <div className={classnames(B)}>
                <div className={classnames(`${B}-headerbox`)}>
                    {segments.header || <Header />}
                </div>
                <div className={classnames(`${B}-mainbox`)}>
                    {segments.main}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: RootState, ownProps = {}): any {
    return {
        isAuthenticated: authSelectors.identity.isAuthenticated(state),
    };
}

export const DefaultLayout = withRouter(
    connect(mapStateToProps)(DefaultLayoutClass)
);