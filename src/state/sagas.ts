import { all, fork } from 'typed-redux-saga';

import { appSaga } from './app/AppSagas';
import { userSaga } from './user/UserSagas';
import { watchUser } from './user/UserWatcherSaga';
import { cartSaga } from './cart/CartSaga';
import { adsWatcher } from './watchers/AdsWatcher';
import { companiesWatcher } from './watchers/CompaniesWatcher';

export function* rootSaga() {
  yield* all([
    fork(userSaga),
    fork(cartSaga),
    fork(appSaga),
    fork(companiesWatcher),
    fork(watchUser),
    fork(adsWatcher),
  ]);
}
