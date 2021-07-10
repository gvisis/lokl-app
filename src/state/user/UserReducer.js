import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const INITIAL_STATE = {
	userInfo: {},
	auth: false,
}

export const userReducer = createReducer(INITIAL_STATE, {
	[constants.user.SET_USER_INFO]: (state, action) => {
		state.auth = true;
		state.userInfo = action.payload;
	},
	[constants.user.LOG_OUT]: () => INITIAL_STATE
})
