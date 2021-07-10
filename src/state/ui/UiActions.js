import { constants } from '../constants';

const setOnSync = (key, bool) => ({
	type: constants.ui.SET_ON_SYNC,
	key, bool,
});

const setStatus = (key, bool, message) => ({
	type: constants.ui.SET_STATUS,
	key, bool, message
});

export const uiActions = {
	setOnSync,
	setStatus,
};