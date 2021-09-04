import { ErrorType, SetOnSync, ThemeTypes } from '../../types/general';
import { constants } from '../constants';

const setOnSync = (key: SetOnSync, bool: boolean) => ({
  type: constants.ui.SET_ON_SYNC,
  key,
  bool,
});

const setStatus = (key: ErrorType, bool: boolean, message: string) => ({
  type: constants.ui.SET_STATUS,
  key,
  bool,
  message,
});

const setTheme = (theme: ThemeTypes) => ({
  type: constants.ui.SET_THEME,
  theme,
});

const clearErrors = () => ({
  type: constants.ui.CLEAR_ERRORS,
});

const passResetSuccess = (bool: boolean) => ({
  type: constants.ui.PASS_RESET_SUCCESS,
  bool,
});
const clearPassResetStatus = () => ({
  type: constants.ui.CLEAR_PASS_RESET_STATUS,
});

export const uiActions = {
  setTheme,
  setOnSync,
  setStatus,
  clearErrors,
  passResetSuccess,
  clearPassResetStatus,
};
