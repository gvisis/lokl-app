import { call, put, takeLatest } from 'redux-saga/effects';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import { UploadImageProps } from './AppInterfaces';
import { api } from '../../api';

function* handleFetchAllAds() {
  try {
    yield put(actions.ui.setOnSync('app', true));
    const allAds: unknown = yield call(firebaseDb.fetchAllAds);
    const objectValuesToArray = Object.values(allAds);
    yield put(actions.app.setAllAds(objectValuesToArray));
    yield put(actions.ui.setOnSync('app', false));
  } catch (e) {
    console.log('userinfoerror', e);
    yield put(actions.ui.setOnSync('app', false));
  }
}

function* handleUploadImages({ adId, images }: UploadImageProps) {
  try {
    yield call(firebaseDb.uploadImageToStorage, adId, images);
    console.log('uploaded images');
  } catch (e) {
    console.log('uploadimageserror', e);
  }
}

export function* appSaga() {
  yield takeLatest(constants.app.FETCH_ALL_ADS, handleFetchAllAds);

  //! error: no overload matches this call?
  yield takeLatest(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
}
