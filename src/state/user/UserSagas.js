import { call, put, takeLatest } from 'redux-saga/effects';
import i18n from 'i18next';
import { navigation } from '@react-navigation/native';

import { actions } from '../actions'
import { ROUTES } from '../../routes/RouteNames'
import { constants } from '../constants';
import { api } from '../../api';

//! needs a seperate error handler
function* handleLogin({ email, password }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.login, 'email@example.com', 'password123');
		// yield call(api.login, email, password);
		const userInfo = {
			email: api.getUserInfo().email,
			id: api.getUserInfo().uid,
		}
		yield put(actions.user.setUserInfo(userInfo))
		yield put(actions.ui.setStatus('success', true, 'Succesfuly logged in!'))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handleLogout() {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.logout);
		yield put(actions.ui.setStatus('success', true, 'User signed out!'))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.user.clearUserState())
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handleRegistration({ email, password }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.register, email, password);
		const userInfo = {
			email: api.getUserInfo().email,
			id: api.getUserInfo().uid,
		}
		yield put(actions.user.setUserInfo(userInfo))
		yield put(actions.ui.setStatus('success', true, 'Succesfuly registered!'))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handlePasswordReset({ email }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.passworReset, email);
		yield put(actions.ui.setStatus('success', true, `Password reset link sent to ${email}`))
		yield put(navigation.navigate(ROUTES.Login))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

export function* userSaga() {
	yield takeLatest(constants.user.LOGIN, handleLogin);
	yield takeLatest(constants.user.LOG_OUT, handleLogout);
	yield takeLatest(constants.user.REGISTER, handleRegistration);
	yield takeLatest(constants.user.PASSWORD_RESET, handlePasswordReset);
}