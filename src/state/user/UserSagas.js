import { call, put, takeLatest } from 'redux-saga/effects';
// import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';

import { actions } from '../actions'
import { constants } from '../constants';
import { api } from '../../api';

//! needs a seperate error handler
// const { t } = useTranslation();
function* handleLogin({ email, password }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		//! Will have to go after formik and yup implementation.
		if (email === '' || password === '') {
			yield put(
				actions.ui.setStatus('error', true, 'auth/fill-all-fields')
				// actions.ui.setStatus('error', true, t('errors:auth/fill-all-fields')),
			);
		} else {
			yield call(api.login, 'email@example.com', 'password123');
			// yield call(api.login, email, password);
			const userInfo = {
				email: api.getUserInfo().email,
				id: api.getUserInfo().uid,
			}
			yield put(actions.user.setUserInfo(userInfo))
		}
	} catch (e) {
		yield put(
			actions.ui.setStatus('error', true, e.code))
		// actions.ui.setStatus('error', true, t(`errors: ${ e.code }`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handleLogout() {
	try {
		yield put(actions.ui.setOnSync('user', true));
		yield call(api.logout);
	} catch (e) {
		console.warn(e);
	} finally {
		yield put(actions.user.clearUserState())
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handleRegistration({ email, password }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		//! Will have to go after formik and yup implementation.
		if (email === '' || password === '') {
			yield put(
				actions.ui.setStatus('error', true, 'auth/fill-all-fields')
				// actions.ui.setStatus('error', true, t('errors:auth/fill-all-fields')),
			);
		} else {
			yield call(api.register, email, password);
			const userInfo = {
				email: api.getUserInfo().email,
				id: api.getUserInfo().uid,
			}
			yield put(actions.user.setUserInfo(userInfo))
		}
	} catch (e) {
		yield put(
			actions.ui.setStatus('error', true, e.code))
		// actions.ui.setStatus('error', true, t(`errors: ${ e.code }`)))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

function* handlePasswordReset({ email }) {
	try {
		yield put(actions.ui.setOnSync('user', true));
		if (email !== '') {
			yield call(auth().sendPasswordResetEmail(email))
		} else {
			yield put(actions.ui.setStatus('error', true, 'Enter email'))
			// yield put(actions.ui.setStatus('error', true, t(`common:Enter email`)));
		}
	} catch (e) {
		yield put(
			actions.ui.setStatus('error', true, e.code))
	} finally {
		yield put(actions.ui.setOnSync('user', false));
		yield put(actions.ui.setStatus('success', true, `Password reset link sent to ${email}`))
	}
}

export function* userSaga() {
	yield takeLatest(constants.user.LOGIN, handleLogin);
	yield takeLatest(constants.user.LOG_OUT, handleLogout);
	yield takeLatest(constants.user.REGISTER, handleRegistration);
	yield takeLatest(constants.user.PASSWORD_RESET, handlePasswordReset);
}