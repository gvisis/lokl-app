import { constants } from '../constants';

export const setUserInfo = payload => ({
	type: constants.user.SET_USER_INFO,
	payload,
});

export const login = payload => ({
	type: constants.user.LOGIN,
	payload
});

export const userActions = {
	setUserInfo,
	login
};