import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export interface UserReducerState {
  userInfo: {
    name: string;
    email: string;
    age: number;
    city: string;
    ads: any;
  };
}

const INITIAL_STATE: UserReducerState = {
  userInfo: null,
};

export const userReducer = createReducer(INITIAL_STATE, {
  [constants.user.SET_USER_INFO]: (state, action) => {
    state.userInfo = action.payload;
  },
  [constants.user.CLEAR_USER_STATE]: () => INITIAL_STATE,
});
