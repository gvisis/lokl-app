import { createReducer } from '@reduxjs/toolkit';

import { actions } from '../actions';
import { constants } from '../constants';
import { UserReducerState } from './UserInterfaces';

const INITIAL_STATE: UserReducerState = {
  userInfo: null,
};

export const userReducer = createReducer(INITIAL_STATE, {
  [actions.user.setUserInfo.type]: (state, action) => {
    state.userInfo = action.payload;
  },
  [constants.user.CLEAR_USER_STATE]: () => INITIAL_STATE,
});
