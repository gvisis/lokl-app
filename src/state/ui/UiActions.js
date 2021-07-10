import { constants } from '../constants';

const setOnSync = payload => ({
	type: constants.ui.SET_ON_SYNC,
	payload,
});

const setStatus = (key, bool, message) => ({
	type: constants.ui.SET_STATUS,
	key, bool, message
});

export const uiActions = {
	setOnSync,
	setStatus,
};