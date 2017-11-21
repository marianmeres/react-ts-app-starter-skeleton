import { combineReducers } from 'redux';
import {
    windowActionTypes, windowActionCreators, windowReducer, WindowState
} from './window';

// mixture of inspiration from:
// https://github.com/erikras/ducks-modular-redux
// https://github.com/alexnm/re-ducks

export interface AppState {
    window: WindowState;
}

/*********************************************************************************
 * A module MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
 *
 * A module MAY export its action types as UPPER_SNAKE_CASE, if an external reducer
 * needs to listen for them, or if it is a published reusable library
 ********************************************************************************/

export const appActionTypes = {
    window: windowActionTypes,
};


/*********************************************************************************
 * A module MUST export its action creators as functions
 ********************************************************************************/

export const appActions = {
    window: windowActionCreators,
};

/*********************************************************************************
 * A module MUST export default a function called reducer()
 ********************************************************************************/

const reducer = combineReducers({
    window: windowReducer,
});

export default reducer;