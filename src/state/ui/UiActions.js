import { constants } from '../constants';

const setOnSync = payload => ({
	type: constants.ui.SET_ON_SYNC,
	payload,
});

const setError = payload => ({
	type: constants.ui.SET_ERROR,
	payload
});

export const uiActions = {
	setOnSync,
	setError,
};