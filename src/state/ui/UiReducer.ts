import { createReducer } from '@reduxjs/toolkit';

import { ErrorType, SetOnSync, ThemeTypes } from '../../types/general';
import { constants } from '../constants';
import { ERROR_TYPE, THEME } from '../../utils/variables';

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
  appTheme: ThemeTypes;
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
  appTheme: THEME.LIGHT,
};
export interface UiStateSetter<T> {
  key: T;
  bool: boolean;
  message?: string;
}

export const uiReducer = createReducer(INITIAL_STATE, {
  [constants.ui.SET_ON_SYNC]: (
    state,
    { key, bool }: UiStateSetter<SetOnSync>,
  ) => {
    state.onSync[key] = bool;
  },

  [constants.ui.SET_STATUS]: (
    state,
    { key, bool, message }: UiStateSetter<ErrorType>,
  ) => {
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

  [constants.ui.PASS_RESET_SUCCESS]: (state, { bool }: { bool: boolean }) => {
    state.passResetStatus = bool;
  },

  [constants.ui.CLEAR_PASS_RESET_STATUS]: state => {
    state.passResetStatus = INITIAL_STATE.passResetStatus;
  },

  [constants.ui.SET_THEME]: (state, { theme }: { theme: ThemeTypes }) => {
    state.appTheme = theme;
  },
});
