import { createReducer } from '@reduxjs/toolkit';

import { AdsProps } from '../app/AppInterfaces';
import { constants } from '../constants';

export interface UserProps {
  name: string;
  email: string;
  age: number;
  city: string;
  ads: AdsProps[];
}
export interface UserReducerState {
  userInfo: UserProps;
}

const INITIAL_STATE: UserReducerState = {
  userInfo: null,
};

export const userReducer = createReducer(INITIAL_STATE, {
  // [actions.user.setUserInfo.type]: (state, action) => {
  [constants.user.SET_USER_INFO]: (state, action) => {
    state.userInfo = action.payload;
  },
  [constants.user.CLEAR_USER_STATE]: () => INITIAL_STATE,
});
