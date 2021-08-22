import { call, put, takeEvery } from 'redux-saga/effects';
import { launchImageLibrary } from 'react-native-image-picker';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import { UploadImageProps } from './AppInterfaces';
import { sortAsc } from '../../utils/functions';

function* handleFetchAllAds() {
  try {
    yield put(actions.ui.setOnSync('app', true));
    const allAds: unknown = yield call(firebaseDb.fetchAllAds);
    const adsArray = Object.values(allAds);
    yield put(actions.app.setAllAds(adsArray));
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

function* handlePickImage() {
  console.log('pick');
  try {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 600,
    };
    const imageObject = launchImageLibrary(
      options,
      ({ errorMessage, assets }) => {
        if (assets) {
          const imageUrl = assets[0].uri;
          const imageId = assets[0].uri.split('temp_')[1].split('.jpg')[0];
          return { url: imageUrl, id: imageId };
        }
        if (errorMessage) {
          throw new Error(errorMessage);
        }
      },
    );
    console.log('imageObject', imageObject);

    yield put(actions.app.setTempImages(imageObject));
  } catch (e) {
    // yield put(actions.ui.setStatus('error', true, e.message));
    console.log('pickimageerror', e);
  }
}
function* handleFetchAllCompanies() {
  try {
    const allCompanies: unknown = yield call(firebaseDb.fetchAllCompanies);
    const companiesArray = Object.values(allCompanies).sort((a, b) =>
      sortAsc(a.title, b.title),
    );
    yield put(actions.app.setAllCompanies(companiesArray));
    const filteredComps = companiesArray
      .filter(company => company.produce.length > 0)
      .map(company => company.produce)
      .reduce((firstValue, secondValue) => firstValue.concat(secondValue));
    yield put(actions.app.setProducts(filteredComps));
  } catch (e) {
    console.log('userinfoerror', e);
  }
}

function* handleFetchCategories() {
  try {
    const categories: unknown = yield call(firebaseDb.fetchCategories);
    const categoriesArray = Object.values(categories).sort((a, b) =>
      sortAsc(a.title, b.title),
    );
    yield put(actions.app.setCategories(categoriesArray));
  } catch (e) {
    console.log('userinfoerror', e);
  }
}

export function* appSaga() {
  yield takeEvery(constants.app.FETCH_ALL_ADS, handleFetchAllAds);
  yield takeEvery(constants.app.PICK_IMAGE, handlePickImage);
  yield takeEvery(constants.app.FETCH_ALL_COMPANIES, handleFetchAllCompanies);
  yield takeEvery(constants.app.FETCH_CATEGORIES, handleFetchCategories);
  //! error: no overload matches this call?
  yield takeEvery(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
}
