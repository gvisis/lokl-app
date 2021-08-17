import { call, put, select, takeEvery } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import i18n from 'i18next';

import { actions } from '../actions';
import { constants } from '../constants';
import { api } from '../../api';
import { AnyObject } from '../../types/general';
import { firebaseDb } from '../../api/firebaseDb';
import { RootState } from '../reducers';

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
function* handleSignup({ email, password }: UserAuthCredentials) {
  try {
    yield put(actions.ui.setOnSync('user', true));
    yield call(api.signup, email, password);
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
    email,
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
function* handleCreateNewAd({ newAd, images }) {
  try {
    yield put(actions.ui.setOnSync('app', true));
    const currentUserId = api.getUserInfo().uid;
    console.log('newadid', newAd.id);
    console.log('images', images);

    const newAdKey: string = yield call(
      firebaseDb.createAd,
      currentUserId,
      newAd,
    );
    yield call(firebaseDb.uploadImageToStorage, newAdKey, newAd.id, images);

    // later updated with ad Watcher
    const allAds = yield select((state): RootState => state.app.allAppAds);
    yield put(actions.app.setAllAds([...allAds, newAd]));
  } catch (e) {
    console.log('newaderror', e);
  } finally {
    yield put(actions.ui.setOnSync('app', false));
  }
}

function* handleGetUserAds() {
  try {
    yield put(actions.ui.setOnSync('button', true));
    const currentUser: string = api.getUserInfo().uid;
    database()
      .ref(`/users/${currentUser}`)
      .once('value')
      .then(snap => console.log(snap.val().ads));
  } catch (e) {
    console.log('userinfoerror', e);
  } finally {
    yield put(actions.ui.setOnSync('button', false));
  }
}

export function* userSaga() {
  yield takeEvery(constants.user.LOGIN, handleLogin);
  yield takeEvery(constants.user.LOG_OUT, handleLogout);
  yield takeEvery(constants.user.SIGN_UP, handleSignup);
  yield takeEvery(constants.user.PASSWORD_RESET, handlePasswordReset);
  yield takeEvery(constants.user.UPDATE_USER_INFO, handleUpdateUserDb);
  yield takeEvery(constants.user.GET_USER_ADS, handleGetUserAds);
  yield takeEvery(constants.user.CREATE_NEW_AD, handleCreateNewAd);
}
