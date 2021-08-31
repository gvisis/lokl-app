import { call, fork, put, takeEvery } from 'typed-redux-saga';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import {
  AdsProps,
  CompanyProduct,
  CompanyProps,
  CompanySagaProps,
  ProductSagaProps,
  UploadImageProps,
} from './AppInterfaces';
import { checkForRatings, sortAsc } from '../../utils/functions';

function* handleUploadImages({ adId, images }: UploadImageProps) {
  try {
    yield* call(firebaseDb.uploadImageToStorage, adId, images);
  } catch (e) {
    console.log('uploadimageserror', e);
  }
}

function* handleSetCompanyRating({ company, ratingData }: CompanySagaProps) {
  try {
    // receives an nested object, typescript doesnt like it
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
    // receives an nested object, typescript doesnt like it
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
  //! error: no overload matches this call?
  yield* takeEvery(constants.app.UPLOAD_AD_IMAGES, handleUploadImages);
  yield* takeEvery(constants.app.FETCH_CATEGORIES, handleFetchCategories);
  yield* takeEvery(constants.app.SET_PRODUCT_RATING, handleSetProductRating);
  yield* takeEvery(constants.app.SET_COMPANY_RATING, handleSetCompanyRating);
}
