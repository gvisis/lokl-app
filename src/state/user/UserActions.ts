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

export const register = (email: string, password: string) => ({
  type: constants.user.REGISTER,
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
  register,
  passwordReset,
  clearUserState,
  updateUserInfo,
};
