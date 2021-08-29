import { createReducer } from '@reduxjs/toolkit';

import { AnyObject, ERROR_TYPE } from '../../types/general';
import { themes } from '../../styles';
import { constants } from '../constants';

export interface UiReducerState {
  onSync: {
    user: boolean;
    app: boolean;
    button: boolean;
  };
  status: {
    success: boolean;
    error: boolean;
    message: string;
  };
  passResetStatus: boolean;
  theme: AnyObject;
}

const INITIAL_STATE: UiReducerState = {
  onSync: {
    user: false,
    app: false,
    button: false,
  },
  status: {
    success: false,
    error: false,
    message: '',
  },
  passResetStatus: false,
  theme: themes.light,
};

export interface UiStateSetter {
  key: string;
  bool: boolean;
  message?: string;
}

export const uiReducer = createReducer(INITIAL_STATE, {
  [constants.ui.SET_ON_SYNC]: (state, { key, bool }: UiStateSetter) => {
    state.onSync[key] = bool;
  },

  [constants.ui.SET_STATUS]: (state, { key, bool, message }: UiStateSetter) => {
    if (key === ERROR_TYPE.SUCCESS) {
      state.status.error = false;
    }
    if (key === ERROR_TYPE.ERROR) {
      state.status.success = false;
    }
    state.status[key] = bool;
    state.status.message = message;
  },

  [constants.ui.CLEAR_ERRORS]: state => {
    state.status = INITIAL_STATE.status;
  },

  [constants.ui.PASS_RESET_SUCCESS]: (state, { bool }: UiStateSetter) => {
    state.passResetStatus = bool;
  },

  [constants.ui.CLEAR_PASS_RESET_STATUS]: state => {
    state.passResetStatus = INITIAL_STATE.passResetStatus;
  },

  [constants.ui.SET_THEME]: (state, { bool }: UiStateSetter) => {
    state.theme = bool ? themes.light : themes.dark;
  },
});
