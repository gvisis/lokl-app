import { createReducer } from '@reduxjs/toolkit'

import { themes } from '../../styles';
import { constants } from '../constants';

const INITIAL_STATE = {
	onSync: {
		user: false,
		app: false,
		button: false,
	},
	status: {
		success: false,
		error: false,
		message: '',
	},
	theme: themes.dark,
}

export const uiReducer = createReducer(INITIAL_STATE, {
	// Usage: 
	// dispatch(actions.ui.setOnSync('user', true))) -> key = user,bool = true;
	// use types instead of 'user' , ex. SET_TYPE.user (constants)
	[constants.ui.SET_ON_SYNC]: (state, { key, bool }) => {
		state.onSync[key] = bool;
	},
	[constants.ui.SET_STATUS]: (state, { key, bool, message }) => {
		if (key === 'success') {
			state.status.error = false;
		}
		if (key === 'error') {
			state.status.success = false;
		}
		state.status[key] = bool;
		state.status.message = message;
	},
	[constants.ui.CLEAR_ERRORS]: state => {
		state.status.message = '';
	},

	[constants.ui.SET_THEME]: (state, { bool }) => {
		state.theme = bool ? themes.dark : themes.light;
	}
});
