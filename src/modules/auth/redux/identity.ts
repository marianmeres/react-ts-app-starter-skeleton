import { combineReducers } from 'redux';
import { FluxStandardAction, RootState } from '../../../app/reducer';
import { default as Identity, IdentityData } from '../models/Identity';
import { saveAppIdentityToLocalStorage } from '../../../app/utils/app-identity';

/*********************************************************************************
 * SUBMODULE ACTION TYPES
 ********************************************************************************/

const _prefix = `auth/identity/`;
const ACTION_IDENTITY_SET = `${_prefix}ACTION_IDENTITY_SET`;


export const identityActionTypes = {
    ACTION_IDENTITY_SET,
};

/*********************************************************************************
 * SUBMODULE ACTIONS (ACTION CREATORS)
 ********************************************************************************/

const setIdentity = (payload: IndentityState | null) => ({
    type: ACTION_IDENTITY_SET,
    payload
});

// quick-n-dirty
// const login = (name) => {
//     if (!name || !name.trim().length) { name = null; }
//     return setIdentity(name ? {name} : null);
// };

export const identityActionCreators = {
    setIdentity,
    // login,
};

/*********************************************************************************
 * SUBMODULE SELECTORS
 ********************************************************************************/

const getIdentity = (state: RootState): IdentityData | null => state.auth.identity;

const isAuthenticated = (state: RootState): boolean => (
    state.auth.identity && state.auth.identity.api_token && state.auth.identity.user_id
);

export const identitySelectors = {
    getIdentity,
    isAuthenticated
};

/*********************************************************************************
 * SUBMODULE REDUCER
 ********************************************************************************/

export interface IndentityState extends IdentityData {
}

const createIdentityInitialState = (): IndentityState => null;
// const initialState = createIdentityInitialState();

export const identityReducer = (
    state: IndentityState | null = createIdentityInitialState(),
    action: FluxStandardAction
) => {
    switch (action.type) {

        case ACTION_IDENTITY_SET:
            let identity = action.payload;
            saveAppIdentityToLocalStorage(identity); // sideEffect...
            return identity ? {...state, ...identity} : null;

        default:
            return state;
    }
};


/*********************************************************************************
 * local helpers
 ********************************************************************************/
