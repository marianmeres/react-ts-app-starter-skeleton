import { combineReducers } from 'redux';
import {
    identityActionCreators, identityActionTypes, identityReducer,
    identitySelectors
} from './identity';

// mixture of inspiration from:
// https://github.com/erikras/ducks-modular-redux
// https://github.com/alexnm/re-ducks

export interface AuthState {
    identity: any;
}

/*********************************************************************************
 * A module MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
 *
 * A module MAY export its action types as UPPER_SNAKE_CASE, if an external reducer
 * needs to listen for them, or if it is a published reusable library
 ********************************************************************************/

export const authActionTypes = {
    identity: identityActionTypes
};

/*********************************************************************************
 * A module MUST export its action creators as functions
 ********************************************************************************/

export const authActions = {
    identity: identityActionCreators
};

/**
 * MM addon: Selectors
 */

export const authSelectors = {
    identity: identitySelectors
};

/*********************************************************************************
 * A module MUST export default a function called reducer()
 ********************************************************************************/

const reducer = combineReducers({
    identity: identityReducer,
});
export default reducer;