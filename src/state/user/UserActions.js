import { constants } from '../constants';

export const setUserInfo = payload => ({
	type: constants.user.SET_USER_INFO,
	payload,
});

export const login = (email, password) => ({
	type: constants.user.LOGIN,
	email, password
});

export const logout = () => ({
	type: constants.user.LOG_OUT
})

export const register = (email, password) => ({
	type: constants.user.REGISTER,
	email, password
});

export const passwordReset = email => ({
	type: constants.user.PASSWORD_RESET,
	email
})

export const clearUserState = () => ({
	type: constants.user.CLEAR_USER_STATE,
})

export const userActions = {
	setUserInfo,
	login,
	logout,
	register,
	passwordReset,
	clearUserState,
};