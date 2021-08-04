import { constants } from '../constants';
import { AnyObject } from '../../types/general';

export const setUserInfo = (payload: AnyObject) => ({
  type: constants.user.SET_USER_INFO,
  payload,
});

export const updateUserInfo = (updatedInfo: AnyObject) => ({
  type: constants.user.UPDATE_USER_INFO,
  updatedInfo,
});

export const login = (email: string, password: string) => ({
  type: constants.user.LOGIN,
  email,
  password,
});

export const logout = () => ({
  type: constants.user.LOG_OUT,
});

export const signup = (email: string, password: string) => ({
  type: constants.user.SIGN_UP,
  email,
  password,
});

export const passwordReset = (email: string) => ({
  type: constants.user.PASSWORD_RESET,
  email,
});

export const clearUserState = () => ({
  type: constants.user.CLEAR_USER_STATE,
});

export const userActions = {
  setUserInfo,
  login,
  logout,
  signup,
  passwordReset,
  clearUserState,
  updateUserInfo,
};
