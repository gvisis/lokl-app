import { call, put, takeLatest } from 'redux-saga/effects';
// import { useTranslation } from 'react-i18next';

import actions from '../actions'
import constants from '../constants';
import api from '../../api/Api';

// const { t } = useTranslation();
function* handleLogin(action) {
	console.warn(action, 'hanle login');
	const { email, password } = action.payload
	try {
		yield put(actions.ui.setOnSync('user', true));
		//! Will have to go after formik and yup implementation.
		if (email === '' || password === '') {
			yield put(
				actions.ui.setStatus('error', true, 'error fields'),
			);
			// yield put(
			// 	actions.ui.setStatus('error', true, t('errors:auth/fill-all-fields')),
			// );
		} else {
			yield call(api.login, email, password);
			const userInfo = {
				email: api.getUserInfo.email,
				id: api.getUserInfo.id,
			}
			yield put(actions.user.setUserInfo(userInfo))
		}
	} catch (e) {
		yield put(
			actions.ui.setStatus('error', true, 'error kodas kazkoks'))
		// actions.ui.setStatus('error', true, t(`errors:${e.code}`)),
	} finally {
		yield put(actions.ui.setOnSync('user', false));
	}
}

export default function* userSaga() {
	yield takeLatest(constants.user.LOGIN, handleLogin);
}