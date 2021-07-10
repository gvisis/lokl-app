import { constants } from '../constants';

export const setUserEmail = payload => ({
	type: constants.user.SET_USER_EMAIL,
	payload,
});

export const setUserInfo = payload => ({
	type: constants.user.SET_USER_INFO,
	payload,
});

export const logout = () => ({
	type: constants.user.LOG_OUT,
});


export const userActions = {
	setUserEmail,
	setUserInfo,
	logout,
};