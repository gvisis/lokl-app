import { createReducer } from '@reduxjs/toolkit';

import { AnyObject } from '../../types/general';
import { constants } from '../constants';

export interface UserReducerState {
  userInfo: AnyObject;
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
