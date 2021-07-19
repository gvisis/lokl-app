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
	passResetStatus: false,
	theme: themes.dark,
}

export const uiReducer = createReducer(INITIAL_STATE, {
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
		state.status = INITIAL_STATE.status
	},

	[constants.ui.PASS_RESET_SUCCESS]: (state, { bool }) => {
		state.passResetStatus = bool
	},

	[constants.ui.CLEAR_PASS_RESET_STATUS]: state => {
		state.passResetStatus = INITIAL_STATE.passResetStatus
	},

	[constants.ui.SET_THEME]: (state, { bool }) => {
		state.theme = bool ? themes.dark : themes.light;
	}
});
