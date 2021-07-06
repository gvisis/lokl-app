//! To be used with redux later on

import {constants} from '../constants';

export const login = (email, password) => ({
  type: constants.app.LOGIN,
  payload: {email, password},
});

export const logout = () => ({
  type: constants.app.LOGOUT,
});

export const register = (password, email) => ({
  type: constants.app.REGISTER,
  payload: {password, email},
});

export const appActions = {
  login,
  logout,
  register,
};
