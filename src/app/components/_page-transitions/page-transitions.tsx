import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import * as _startsWith from 'lodash/startsWith';
import { config } from '../../config/config';
import './page-transitions.css';
import { BrowserLocationObj } from '../../types';

/**
 * inspiration:
 * https://medium.com/@pshrmn/a-shallow-dive-into-react-router-v4-animated-transitions-4b73f634992a
 * https://codesandbox.io/s/4RAqrkRkn?view=preview
 * https://codesandbox.io/s/8nBON3Ej
 */

/**
 * @param props
 * @returns {any}
 * @constructor
 */
const PageTransition = (props) => {
    let { method } = props;
    if (['push', 'pop'].indexOf(method) === -1) { method = 'none'; }
    let timeout = method === 'none' ? 0 : 250;

    // tu potencialne special case-y pre jednotlive metody

    return (
        <CSSTransition
            {...props}
            classNames={`page-transition page-transition-${method}`}
            timeout={timeout}
            mountOnEnter={true}
            unmountOnExit={true}
            appear={true}
        />
    );
};

/**
 * @param component
 * @param props
 * @returns {any}
 */
export const renderWithTransition = (component, props) => {

    let method = _getTransitionMethod(props);

    // NOTES:
    // a) transition key IS important... `location.pathname` is better than `location.key`
    // b) AND, UFF, `childFactory` (to be able to change method at runtime)
    //    IS ABSOLUTELY CRITICAL to make it work the way we need to...
    return (
        <TransitionGroup
            className={config.css.B('-top-container')}
            childFactory={(Child) => React.cloneElement(Child, { method })}
        >
            <PageTransition
                key={props.location.pathname}
                method={method}
                {...props}
            >
                {component}
            </PageTransition>
        </TransitionGroup>
    );
};

/**
 * akoze biznis logika na detekciu transition metody
 * @param {any} location
 * @param {any} previousLocation
 * @returns {string}
 * @private
 */
const _getTransitionMethod = ({ location, previousLocation }): string => {
    const from = previousLocation.pathname;
    const to = location.pathname;

    // quick-n-dirty here only
    let method = 'push';
    if (from === '/foo/bar') {
        method = 'pop';
    }
    // if (to === '/') {
    //     method = 'none';
    // }

    return method;
};

// const PageTransitionNone = (props) => (
//     <CSSTransition
//         {...props}
//         classNames="page-transition page-transition-none"
//         timeout={0}
//         mountOnEnter={true}
//         unmountOnExit={true}
//         appear={true}
//     />
// );
//
// /**
//  * @param props
//  * @constructor
//  */
// const PageTransitionFade = (props) => (
//     <CSSTransition
//         {...props}
//         classNames="page-transition page-transition-fade"
//         timeout={250}
//         mountOnEnter={true}
//         unmountOnExit={true}
//         appear={true}
//     />
// );
//
// /**
//  * @param props
//  * @constructor
//  */
// const PageTransitionPushOrPop = (props) => {
//     let { method } = props;
//     let whitelist = ['push', 'pop'];
//
//     return (
//         <CSSTransition
//             {...props}
//             classNames={`page-transition page-transition-${props.method || 'push'}`}
//             timeout={250}
//             mountOnEnter={true}
//             unmountOnExit={true}
//             appear={true}
//         />
//     );
// };