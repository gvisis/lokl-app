import { call, put, takeEvery } from 'typed-redux-saga';
import { launchImageLibrary } from 'react-native-image-picker';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import {
  CompanyProduct,
  CompanyProps,
  CompanySagaProps,
  ProductSagaProps,
  UploadImageProps,
} from './AppInterfaces';
import { checkForRatings, sortAsc } from '../../utils/functions';

//! FIX NEEDED AS ITS  NOT FETCHING ALL ADS, ONLY OF CURRENT USER
function* handleFetchAllAds() {
  try {
    yield* put(actions.ui.setOnSync('app', true));
    const allAds: unknown = yield* call(firebaseDb.fetchAllAds);
    if (allAds) {
      const adsArray = Object.values(allAds).sort((a, b) =>
        sortAsc(a.title, b.title),
      );
      yield* put(actions.app.setAllAds(adsArray));
    }
    yield* put(actions.ui.setOnSync('app', false));
  } catch (e) {
    console.log('fetch all ads error', e);
    yield* put(actions.ui.setOnSync('app', false));
  }
}

function* handleUploadImages({ adId, images }: UploadImageProps) {
  try {
    yield* call(firebaseDb.uploadImageToStorage, adId, images);
  } catch (e) {
    console.log('uploadimageserror', e);
  }
}

function* handlePickImage() {
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
          return { url: imageUrl, adId: imageId };
        }
        if (errorMessage) {
          throw new Error(errorMessage);
        }
      },
    );
    yield* put(actions.app.setTempImages(imageObject));
  } catch (e) {
    yield* put(actions.ui.setStatus('error', true, e.message));
  }
}

function* handleFetchAllCompanies() {
  try {
    const allCompanies: unknown = yield* call(firebaseDb.fetchAllCompanies);
    const companiesArray = Object.values(allCompanies).sort((a, b) =>
      sortAsc(a.title, b.title),
    );
    yield* put(actions.app.setAllCompanies(companiesArray));
    const filteredComps = companiesArray
      .filter(company => company.produce.length > 0)
      .map(company => company.produce)
      .reduce((firstValue, secondValue) => firstValue.concat(secondValue));
    yield* put(actions.app.setProducts(filteredComps));
  } catch (e) {
    console.log('fetch all companies error', e);
  }
}
function* handleSetCompanyData({ companyData }: CompanySagaProps) {
  try {
    yield* call(firebaseDb.updateCompany, companyData);
  } catch (e) {
    console.log('set company data error', e);
  }
}

function* handleSetCompanyRating({ company, ratingData }: CompanySagaProps) {
  try {
    const updatedCompany: CompanyProps = yield* call(
      checkForRatings,
      company,
      ratingData,
    );
    yield* call(firebaseDb.updateCompany, updatedCompany);
  } catch (e) {
    console.log('set company rating error', e);
  }
}

function* handleSetProductRating({ product, ratingData }: ProductSagaProps) {
  try {
    const updatedProduct: CompanyProduct = yield* call(
      checkForRatings,
      product,
      ratingData,
    );
    yield* call(firebaseDb.updateProduct, updatedProduct);
  } catch (e) {
    console.log('set product rating error', e);
  }
}

function* handleFetchCategories() {
  try {
    const categories: unknown = yield* call(firebaseDb.fetchCategories);
    const categoriesArray = Object.values(categories).sort((a, b) =>
      sortAsc(a.title, b.title),
    );
    yield* put(actions.app.setCategories(categoriesArray));
  } catch (e) {
    console.log('fetch all categories error', e);
  }
}

export function* appSaga() {
  yield* takeEvery(constants.app.PICK_IMAGE, handlePickImage);
  yield* takeEvery(constants.app.FETCH_ALL_ADS, handleFetchAllAds);
  //! error: no overload matches this call?
  yield* takeEvery(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
  yield* takeEvery(constants.app.SET_COMPANY_DATA, handleSetCompanyData);
  yield* takeEvery(constants.app.FETCH_CATEGORIES, handleFetchCategories);
  yield* takeEvery(constants.app.SET_PRODUCT_RATING, handleSetProductRating);
  yield* takeEvery(constants.app.SET_COMPANY_RATING, handleSetCompanyRating);
  yield* takeEvery(constants.app.FETCH_ALL_COMPANIES, handleFetchAllCompanies);
}
