import { call, put, takeEvery } from 'redux-saga/effects';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import { UploadImageProps } from './AppInterfaces';

function* handleFetchAllAds() {
  try {
    yield put(actions.ui.setOnSync('app', true));
    const allAds: unknown = yield call(firebaseDb.fetchAllAds);
    console.log('sagadata', allAds);
    const objectEntriesToArray = Object.entries(allAds);
    yield put(actions.app.setAllAds(objectEntriesToArray));
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
  yield takeEvery(constants.app.GET_ALL_ADS, handleFetchAllAds);
  yield takeEvery(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
}
