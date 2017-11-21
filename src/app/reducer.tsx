import { combineReducers } from 'redux';
import appReducer, { AppState } from './redux/index';
import authReducer, { AuthState } from '../modules/auth/redux/index';

export interface RootState {
    app?: AppState;
    auth?: AuthState;
}

/**
 * https://github.com/acdlite/flux-standard-action
 *
 * An action MUST:
 * - be a plain JavaScript object.
 * - have a type property.
 *
 * An action MAY:
 * - have an error property.
 * - have a payload property.
 * - have a meta property.
 *
 * An action MUST NOT include properties other than type, payload, error, and meta.
 */
export interface FluxStandardAction {
    // The type of an action identifies to the consumer the nature of the action
    // that has occurred. By convention, type is usually a string constant or a Symbol.
    // If two types are the same, they MUST be strictly equivalent (using ===).
    type: any;
    // The optional payload property MAY be any type of value. It represents the
    // payload of the action. Any information about the action that is not the type
    // or status of the action should be part of the payload field.
    // By convention, if error is true, the payload SHOULD be an error object. This
    // is akin to rejecting a promise with an error object.
    payload?: any;
    // The optional error property MAY be set to true if the action represents an error.
    // An action whose error is true is analogous to a rejected Promise. By convention,
    // the payload SHOULD be an error object.
    // If error has any other value besides true, including undefined and null, the
    // action MUST NOT be interpreted as an error.
    error?: any;
    // The optional meta property MAY be any type of value. It is intended for any
    // extra information that is not part of the payload.
    meta?: any;
}

export const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
});

export default reducer;