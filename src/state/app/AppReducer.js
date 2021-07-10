import { createReducer } from '@reduxjs/toolkit'

import { constants } from '../constants';

const INITIAL_STATE = {
	language: 'en',
}

export const appReducer = createReducer(INITIAL_STATE, {
	[constants.app.SET_LANGUAGE]: (state, action) => {
		state.language = action.language;
	}
});
