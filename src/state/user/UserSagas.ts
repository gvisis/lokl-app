import { call, put, select, take, takeEvery } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import i18n from 'i18next';

import { actions } from '../actions';
import { constants } from '../constants';
import { api } from '../../api';
import { guidGenerator } from '../../utils/functions';
import { firebaseDb } from '../../api/firebaseDb';
import { UserAddress, UserProps } from './UserReducer';

interface UserAuthCredentials {
  email: string;
  password: string;
}

function* handleLogin({ email, password }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync('user', true));
    yield* call(api.login, email, password);
    yield* put(
      actions.ui.setStatus('success', true, i18n.t('common:Login success')),
    );
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield* put(actions.ui.setOnSync('user', false));
  }
}

function* handleLogout() {
  try {
    yield* put(actions.ui.setOnSync('user', true));
    yield* call(api.logout);
    yield* put(
      actions.ui.setStatus('success', true, i18n.t('common:Logout success')),
    );
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield* put(actions.user.clearUserState());
    yield* put(actions.cart.clearCart());
    yield* put(actions.ui.setOnSync('user', false));
  }
}
function* handleSignup({ email, password }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync('user', true));
    yield* call(api.signup, email, password);
    yield* call(handleCreateUserDb, email);
    yield* put(
      actions.ui.setStatus('success', true, i18n.t('common:Register success')),
    );
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield* put(actions.ui.setOnSync('user', false));
  }
}

function* handlePasswordReset({ email }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync('button', true));
    yield* call(api.passworReset, email);
    yield* put(actions.ui.passResetSuccess(true));
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, i18n.t(`errors:${e.code}`)));
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleUpdateUserDb({ updatedInfo }) {
  const userId: string = api.getUserInfo().uid;
  try {
    yield* put(actions.ui.setOnSync('button', true));
    database().ref(`/users/${userId}`).update(updatedInfo);
  } catch (e) {
    console.log('huserinfoupdate', e);
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleAddNewAddress({ newAddressData }) {
  const { street, city, name, phone, country, postcode } = newAddressData;
  const userInfo: UserProps = yield* select(state => state.user.userInfo);
  const addressId = guidGenerator();
  let updatedUserData;
  const newAddressObject: UserAddress = {
    id: addressId,
    name,
    phone,
    street,
    city,
    country,
    postcode,
    default: userInfo.address ? false : true,
  };

  try {
    if (userInfo.address) {
      updatedUserData = {
        ...userInfo,
        address: [...userInfo.address, newAddressObject],
      };
    } else {
      updatedUserData = {
        ...userInfo,
        address: [newAddressObject],
      };
    }
    yield* put(actions.ui.setOnSync('button', true));
    yield* put(actions.user.updateUserInfo(updatedUserData));
    yield* put(actions.ui.setStatus('success', true, 'New address added'));
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, 'There was an error'));
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleCreateUserDb(email: string) {
  const userInfo: UserProps = {
    username: '',
    name: '',
    email,
    phone: '',
    address: [],
    ads: [],
  };
  try {
    const newUserId: string = api.getUserInfo().uid;
    database().ref(`/users/${newUserId}`).set(userInfo);
    yield* put(actions.user.setUserInfo(userInfo));
  } catch (e) {
    console.log('huserinfocreate', e);
  }
}
function* handleCreateNewAd({ newAd, images }) {
  console.log('newAd', newAd);

  try {
    if (images.length === 0) {
      const defaultAdImage = yield* call(firebaseDb.fetchDefaultImage);
      newAd.image = defaultAdImage;
    }
    yield* put(actions.ui.setOnSync('app', true));
    const currentUserId = api.getUserInfo().uid;
    const newAdKey: string = yield* call(
      firebaseDb.createAd,
      currentUserId,
      newAd,
    );
    yield* call(firebaseDb.uploadImageToStorage, newAdKey, newAd.id, images);
  } catch (e) {
    console.log('newaderror', e);
  } finally {
    yield* put(actions.ui.setOnSync('app', false));
  }
}

function* handleGetUserAds() {
  try {
    yield* put(actions.ui.setOnSync('button', true));
    const currentUser: string = api.getUserInfo().uid;
    database()
      .ref(`/users/${currentUser}`)
      .once('value')
      .then(snap => snap.val().ads);
  } catch (e) {
    console.log('get user ads error', e);
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

export function* userSaga() {
  yield* takeEvery(constants.user.LOGIN, handleLogin);
  yield* takeEvery(constants.user.LOG_OUT, handleLogout);
  yield* takeEvery(constants.user.SIGN_UP, handleSignup);
  yield* takeEvery(constants.user.PASSWORD_RESET, handlePasswordReset);
  yield* takeEvery(constants.user.UPDATE_USER_INFO, handleUpdateUserDb);
  yield* takeEvery(constants.user.GET_USER_ADS, handleGetUserAds);
  yield* takeEvery(constants.user.CREATE_NEW_AD, handleCreateNewAd);
  yield* takeEvery(constants.user.ADD_ADDRESS, handleAddNewAddress);
}
