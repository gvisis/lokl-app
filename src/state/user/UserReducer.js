import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const INITIAL_STATE = {
	userInfo: {},
	auth: false,
}

export const userReducer = createReducer(INITIAL_STATE, {
	[constants.SET_USER_INFO]: (state, { userInfo }) => {
		if (userInfo.id) {
			state.auth = true;
			state.userInfo = userInfo;
		}
	},
	[constants.user.LOG_OUT]: () => INITIAL_STATE
})
