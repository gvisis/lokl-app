import { call, put, takeLatest } from 'redux-saga/effects';
import { launchImageLibrary } from 'react-native-image-picker';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import { UploadImageProps } from './AppInterfaces';

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
// const getCategories = async () => {
// 	const companyRef = await database().ref(`/companies/${company.id}`);
// 	const companies = await companyRef
// 		.once('value')
// 		.then(snapshot => snapshot.val());

// 	const categoryRef = await database().ref(`/categories/`);
// 	const allCategories = await categoryRef
// 		.once('value')
// 		.then(snap => snap.val());
// 	setCategories(
// 		allCategories.filter(category =>
// 			companies.categories.includes(category.id),
// 		),
// 	);
// };
export function* appSaga() {
  yield takeLatest(constants.app.FETCH_ALL_ADS, handleFetchAllAds);
  yield takeLatest(constants.app.PICK_IMAGE, handlePickImage);

  //! error: no overload matches this call?
  yield takeLatest(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
}
