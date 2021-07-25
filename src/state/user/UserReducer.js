import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const INITIAL_STATE = {
	userInfo: {},
}

export const userReducer = createReducer(INITIAL_STATE, {
	[constants.user.SET_USER_INFO]: (state, action) => {
		state.userInfo = action.payload;
	},
	[constants.user.UPDATE_USER_INFO]: (state, action) => {
		state.userInfo = { ...state.userInfo, ...action.payload };
	},
	[constants.user.CLEAR_USER_STATE]: () => INITIAL_STATE,
});