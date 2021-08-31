import { call, put, select, takeEvery } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import i18n from 'i18next';

import { actions } from '../actions';
import { constants } from '../constants';
import { api } from '../../api';
import { guidGenerator } from '../../utils/functions';
import { firebaseDb } from '../../api/firebaseDb';
import {
  CreateNewAdProps,
  EditAddressProps,
  UserAddress,
  UserProps,
} from './UserInterfaces';
import { ERROR_TYPE } from '../../utils/variables';

interface UserAuthCredentials {
  email: string;
  password: string;
}

function* handleLogin({ email, password }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync('user', true));
    yield* call(api.login, email, password);
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('common:loginSucc'),
      ),
    );
  } catch (e) {
    yield* put(
      actions.ui.setStatus(ERROR_TYPE.ERROR, true, i18n.t(`errors:${e.code}`)),
    );
  } finally {
    yield* put(actions.ui.setOnSync('user', false));
  }
}

function* handleLogout() {
  try {
    yield* put(actions.ui.setOnSync('user', true));
    yield* call(api.logout);
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('common:logoutSucc'),
      ),
    );
  } catch (e) {
    yield* put(
      actions.ui.setStatus(ERROR_TYPE.ERROR, true, i18n.t(`errors:${e.code}`)),
    );
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
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('common:registerSucc'),
      ),
    );
  } catch (e) {
    yield* put(
      actions.ui.setStatus(ERROR_TYPE.ERROR, true, i18n.t(`errors:${e.code}`)),
    );
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
    yield* put(
      actions.ui.setStatus(ERROR_TYPE.ERROR, true, i18n.t(`errors:${e.code}`)),
    );
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleUpdateUserDb({ updatedInfo }) {
  try {
    yield* put(actions.ui.setOnSync('button', true));
    console.log('userupd', updatedInfo);
    yield call(firebaseDb.updateUser, updatedInfo);
  } catch (e) {
    console.log('huserinfoupdate', e);
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleAddNewAddress({ newAddressData }) {
  const { street, city, name, phone, country, postcode } = newAddressData;
  const userInfo: UserProps = yield* select(state => state.user.userInfo);
  const newAddressId = guidGenerator();
  let updatedUserData;
  const newAddressObject: UserAddress = {
    id: newAddressId,
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
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('profile:newAddressAdded'),
      ),
    );
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('errors:thereWasError'),
      ),
    );
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}
function* handleEditAddress({ addressId, editedAddress }: EditAddressProps) {
  try {
    const addresses: UserAddress[] = yield* select(
      state => state.user.userInfo.address,
    );

    const updatedAddresses = addresses
      .map(address => {
        if (address.id === addressId) {
          return {
            ...address,
            ...editedAddress,
          };
        }
        return address;
      })
      .flat();

    yield* put(actions.ui.setOnSync('button', true));
    yield* put(actions.user.updateUserInfo({ address: updatedAddresses }));
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('errors:thereWasError'),
      ),
    );
  } finally {
    yield* put(actions.ui.setOnSync('button', false));
  }
}

function* handleRemoveAddress({ addressId }: { addressId: string }) {
  const addresses: UserAddress[] = yield* select(
    state => state.user.userInfo.address,
  );
  try {
    const filteredAddresses = addresses.filter(
      address => address.id !== addressId,
    );
    yield* put(actions.user.updateUserInfo({ address: filteredAddresses }));
    yield* put(actions.ui.setOnSync('button', true));
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('profile:addressRemoved'),
      ),
    );
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('address/adddressRemoveError'),
      ),
    );
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
function* handleCreateNewAd({ newAd, images }: CreateNewAdProps) {
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
    yield* call(firebaseDb.uploadImageToStorage, newAdKey, images);
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
  yield* takeEvery(constants.user.REMOVE_ADDRESS, handleRemoveAddress);
  yield* takeEvery(constants.user.EDIT_ADDRESS, handleEditAddress);
}
