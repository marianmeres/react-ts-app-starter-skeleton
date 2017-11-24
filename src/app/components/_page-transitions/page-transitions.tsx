import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { config } from '../../config/config';
import './page-transitions.css';
import {
    goesDeeper, goesElse, goesHigher, goesSame, goesToSibling
} from './utils';

const TRANS_RIGHT_2_LEFT = 'r2l';
const TRANS_LEFT_2_RIGHT = 'l2r';
const TRANS_FADE = 'fade';
const TRANS_NONE = 'none';

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
    if ([TRANS_RIGHT_2_LEFT, TRANS_LEFT_2_RIGHT, TRANS_FADE].indexOf(method) === -1) {
        method = TRANS_NONE;
    }
    let timeout = _getTransitionDuration(method);

    // tu potencialne special case-y pre jednotlive metody

    return (
        <CSSTransition
            {...props}
            classNames={`page-transition page-transition-${method} page-transition-${method}`}
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
    // a) transition key IS important... (`location.pathname` is better than `location.key`)
    // b) AND, UFF, `childFactory` IS ABSOLUTELY CRITICAL (to be able to change
    //    method at runtime) to make it work the way we need to...
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
    // console.warn(`${from} => ${to}`);

    switch (true) {
        case goesDeeper(from, to):
            return TRANS_RIGHT_2_LEFT;
        case goesHigher(from, to):
            return TRANS_LEFT_2_RIGHT;
        case goesToSibling(from, to):
            return TRANS_FADE;
        case goesSame(from, to):
        case goesElse(from, to):
        default:
            return TRANS_NONE;
    }
};

/**
 * @param method
 * @returns {number}
 * @private
 */
const _getTransitionDuration = (method) => {
    switch (method) {
        case TRANS_FADE:
            return 500;
        case TRANS_NONE:
            return 0;
        default:
            return 250;
    }
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