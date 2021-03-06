import { call, delay, put, select, takeEvery } from 'typed-redux-saga';
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
  UserAuthCredentials,
  UserProps,
} from './UserInterfaces';
import { ERROR_TYPE, ON_SYNC } from '../../utils/variables';

function* handleLogin({ email, password }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, true));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, false));
  }
}

function* handleLogout() {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, true));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, false));
  }
}
function* handleSignup({ email, password }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, true));
    const signedUpUserId = yield* call(api.signup, email, password);
    const userInfo: UserProps = {
      username: '',
      name: '',
      email,
      phone: '',
    };
    yield* call(firebaseDb.createUserDb, signedUpUserId, userInfo);
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
    yield* put(actions.ui.setOnSync(ON_SYNC.USER, false));
  }
}

function* handlePasswordReset({ email }: UserAuthCredentials) {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
    yield* call(api.passworReset, email);
    yield* put(actions.ui.passResetSuccess(true));
  } catch (e) {
    yield* put(
      actions.ui.setStatus(ERROR_TYPE.ERROR, true, i18n.t(`errors:${e.code}`)),
    );
  } finally {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
  }
}

function* handleUpdateUserDb({ updatedInfo }: { updatedInfo: UserProps }) {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
    yield call(firebaseDb.updateUser, updatedInfo);
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('errors:profile/userUpdate'),
      ),
    );
  } finally {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
  }
}

function* handleAddNewAddress({
  newAddressData,
}: {
  newAddressData: UserAddress;
}) {
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
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
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

    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
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
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
  }
}

function* handleCreateNewAd({ newAd, images }: CreateNewAdProps) {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.APP, true));
    if (images.length === 0) {
      const defaultAdImage = yield* call(firebaseDb.fetchDefaultImage);
      newAd.image = defaultAdImage;
    }
    const currentUserId = api.getUserInfo().uid;
    const newAdKey: string = yield* call(
      firebaseDb.createAd,
      currentUserId,
      newAd,
    );
    yield* call(firebaseDb.uploadAdImagesToStorage, newAdKey, images);
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.SUCCESS,
        true,
        i18n.t('ads:adSuccessfull'),
      ),
    );
  } catch (e) {
    yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
  } finally {
    yield* delay(3500);
    yield* put(actions.ui.setOnSync(ON_SYNC.APP, false));
  }
}

function* handleGetUserAds() {
  try {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, true));
    const currentUser: string = api.getUserInfo().uid;
    database()
      .ref(`/users/${currentUser}`)
      .once('value')
      .then(snap => snap.val().ads);
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('errors:thereWasError'),
      ),
    );
  } finally {
    yield* put(actions.ui.setOnSync(ON_SYNC.BUTTON, false));
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
