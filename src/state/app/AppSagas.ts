import { call, put, takeEvery } from 'typed-redux-saga';

import { actions } from '../actions';
import { constants } from '../constants';
import { firebaseDb } from '../../api/firebaseDb';
import {
  CompanyProduct,
  CompanyProps,
  CompanySagaProps,
  ProductSagaProps,
} from './AppInterfaces';
import {
  CheckForRatings,
  checkForRatings,
  sortAsc,
} from '../../utils/functions';
import { ERROR_TYPE } from '../../utils/variables';

function* handleSetCompanyRating({ company, ratingData }: CompanySagaProps) {
  try {
    const updatedCompany: CheckForRatings = yield* call(
      checkForRatings,
      company,
      ratingData,
    );
    yield* call(firebaseDb.updateCompany, updatedCompany as CompanyProps);
  } catch (e) {
    yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
  }
}

function* handleSetProductRating({ product, ratingData }: ProductSagaProps) {
  try {
    const updatedProduct: CheckForRatings = yield* call(
      checkForRatings,
      product,
      ratingData,
    );
    yield* call(firebaseDb.updateProduct, updatedProduct as CompanyProduct);
  } catch (e) {
    yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
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
    yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
  }
}

export function* appSaga() {
  //! error: no overload matches this call?
  yield* takeEvery(constants.app.FETCH_CATEGORIES, handleFetchCategories);
  yield* takeEvery(constants.app.SET_PRODUCT_RATING, handleSetProductRating);
  yield* takeEvery(constants.app.SET_COMPANY_RATING, handleSetCompanyRating);
}
