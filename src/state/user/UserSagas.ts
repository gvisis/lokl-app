import { call, put, takeEvery } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import i18n from 'i18next';

import { actions } from '../actions';
import { constants } from '../constants';
import { api } from '../../api';
import { AnyObject } from '../../types/general';

interface UserAuthCredentials {
  email: string;
  password: string;
}

function* handleLogin({ email, password }: UserAuthCredentials) {
  try {
    yield put(actions.ui.setOnSync('user', true));
    yield call(api.login, email, password);
    yield put(
      actions.ui.setStatus('success', true, i18n.t('common:Login success')),
    );
  } catch (e) {
    yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield put(actions.ui.setOnSync('user', false));
  }
}

function* handleLogout() {
  try {
    yield put(actions.ui.setOnSync('user', true));
    yield call(api.logout);
    yield put(
      actions.ui.setStatus('success', true, i18n.t('common:Logout success')),
    );
  } catch (e) {
    yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield put(actions.user.clearUserState());
    yield put(actions.ui.setOnSync('user', false));
  }
}
function* handleRegistration({ email, password }: UserAuthCredentials) {
  try {
    yield put(actions.ui.setOnSync('user', true));
    yield call(api.register, email, password);
    yield call(handleCreateUserDb, email);
    yield put(
      actions.ui.setStatus('success', true, i18n.t('common:Register success')),
    );
  } catch (e) {
    yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield put(actions.ui.setOnSync('user', false));
  }
}

function* handlePasswordReset({ email }: UserAuthCredentials) {
  try {
    yield put(actions.ui.setOnSync('button', true));
    yield call(api.passworReset, email);
    yield put(actions.ui.passResetSuccess(true));
  } catch (e) {
    yield put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield put(actions.ui.setOnSync('button', false));
  }
}

function* handleUpdateUserDb({ updatedInfo }: AnyObject) {
  const userId: string = api.getUserInfo().uid;
  try {
    yield put(actions.ui.setOnSync('button', true));
    database().ref(`/users/${userId}`).update(updatedInfo);
  } catch (e) {
    console.log('huserinfoupdate', e);
  }
}

function* handleCreateUserDb(email: string) {
  const userInfo = {
    email: email,
    name: '',
    city: '',
    age: 0,
  };
  try {
    const newUserId: string = api.getUserInfo().uid;
    database().ref(`/users/${newUserId}`).set(userInfo);
    yield put(actions.user.setUserInfo(userInfo));
  } catch (e) {
    console.log('huserinfocreate', e);
  }
}

export function* userSaga() {
  yield takeEvery(constants.user.LOGIN, handleLogin);
  yield takeEvery(constants.user.LOG_OUT, handleLogout);
  yield takeEvery(constants.user.REGISTER, handleRegistration);
  yield takeEvery(constants.user.PASSWORD_RESET, handlePasswordReset);
  yield takeEvery(constants.user.UPDATE_USER_INFO, handleUpdateUserDb);
}