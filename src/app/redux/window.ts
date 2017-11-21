import { combineReducers } from 'redux';
import { FluxStandardAction, RootState } from '../reducer';

/*********************************************************************************
 * SUBMODULE ACTION TYPES
 ********************************************************************************/

const _prefix = `app/window/`;
const ACTION_WINDOW_SAVE_DIMENSIONS = `${_prefix}ACTION_WINDOW_SAVE_DIMENSIONS`;

export const windowActionTypes = {
    ACTION_WINDOW_SAVE_DIMENSIONS,
};

/*********************************************************************************
 * SUBMODULE ACTIONS (ACTION CREATORS)
 ********************************************************************************/

const saveWindowDimensions = ({ width, height }) => ({
    type: ACTION_WINDOW_SAVE_DIMENSIONS,
    payload: { width, height }
});

export const windowActionCreators = {
    saveWindowDimensions,
};

/*********************************************************************************
 * SUBMODULE SELECTORS
 ********************************************************************************/

const getWindowDimensions = (state: RootState) => ({
    width: state.app.window.width,
    height: state.app.window.height
});

export const windowSelectors = {
    getWindowDimensions
};

/*********************************************************************************
 * SUBMODULE REDUCER
 ********************************************************************************/

export interface WindowState {
    width: number;
    height: number;
}

const createWindowInitialState = (): WindowState => ({
    width: 0,
    height: 0,
});

export const windowReducer = (
    state: WindowState = createWindowInitialState(),
    action: FluxStandardAction
) => {
    switch (action.type) {
        case ACTION_WINDOW_SAVE_DIMENSIONS:
            return {...action.payload};
        default:
            return state;
    }
};
