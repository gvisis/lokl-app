import { createReducer } from '@reduxjs/toolkit'

import { constants } from '../constants';

const INITIAL_STATE = {
	onSync: {
		user: false,
		app: false,
		button: false,
	},
	error: false,
	errorMessage: 'nera',
}

export const uiReducer = createReducer(INITIAL_STATE, {
	// Usage: 
	// dispatch(actions.ui.setOnSync('user', true))) -> key = user,bool = true;
	// use types instead of 'user' , ex. SET_TYPE.user (constants)
	[constants.ui.SET_ON_SYNC]: (state, { key, bool }) => {
		state.onSync[key] = bool;
	},
	[constants.ui.SET_ERROR]: (state, action) => { //! can i destructure it ? 
		state.errorMessage = action.payload;
		state.error = true;
	}
});
