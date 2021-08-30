import { createAction } from '@reduxjs/toolkit';

import { constants } from '../constants';
import { AnyObject } from '../../types/general';
import { UserAddress } from './UserInterfaces';

export const setUserInfo = createAction<AnyObject>(
  constants.user.SET_USER_INFO,
);

export const updateUserInfo = (updatedInfo: AnyObject) => ({
  type: constants.user.UPDATE_USER_INFO,
  updatedInfo,
});

export const addAddress = (newAddressData: UserAddress) => ({
  type: constants.user.ADD_ADDRESS,
  newAddressData,
});

export const getUserAds = () => ({
  type: constants.user.GET_USER_ADS,
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
export const createNewAd = (newAd, images) => ({
  type: constants.user.CREATE_NEW_AD,
  newAd,
  images,
});

export const userActions = {
  login,
  logout,
  signup,
  addAddress,
  getUserAds,
  setUserInfo,
  createNewAd,
  passwordReset,
  updateUserInfo,
  clearUserState,
};
