import { call, put, takeLatest } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import i18n from 'i18next';

import { actions } from '../actions'
import { constants } from '../constants';
import { api } from '../../api';

function* handleLogin({ email, password }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.login, email, password);
		yield put(actions.ui.setStatus('success', true, i18n.t('common:Login success')))
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
		yield put(actions.ui.setStatus('success', true, i18n.t('common:Logout success')))
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
		yield call(handleCreateUserDb, email);
		yield put(actions.ui.setStatus('success', true, i18n.t('common:Register success')))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handlePasswordReset({ email }) {
	try {
		yield put(actions.ui.setOnSync('button', true));
		yield call(api.passworReset, email);
		yield put(actions.ui.passResetSuccess(true))
	} catch (e) {
		yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)))
	} finally {
		yield put(actions.ui.setOnSync('button', false));
	}
}
function* handleUserInfoDbUpdate({ payload }) {

	const userId = api.getUserInfo().uid;
	try {
		database()
			.ref(`/users/${userId}`)
			.update(payload)
	} catch (e) {
		console.log('huserinfoupdate', e)
	}
}

function* handleCreateUserDb(email) {
	const userInfo = {
		email: email,
		name: '',
		city: '',
		age: 0,
	}
	try {
		const newUserId = api.getUserInfo().uid;
		database()
			.ref(`/users/${newUserId}`)
			.set(userInfo)

		yield put(actions.user.setUserInfo(userInfo)) // listener shoud work 
	} catch (e) {
		console.log('huserinfocreate', e)
	}

}

export function* userSaga() {
	yield takeLatest(constants.user.LOGIN, handleLogin);
	yield takeLatest(constants.user.LOG_OUT, handleLogout);
	yield takeLatest(constants.user.REGISTER, handleRegistration);
	yield takeLatest(constants.user.PASSWORD_RESET, handlePasswordReset);
	yield takeLatest(constants.user.UPDATE_USER_INFO, handleUserInfoDbUpdate);
}