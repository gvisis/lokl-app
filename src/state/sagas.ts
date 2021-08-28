import { all, fork } from 'typed-redux-saga';

import { appSaga } from './app/AppSagas';
import { userSaga } from './user/UserSagas';
import { watchUser } from './user/UserWatcherSaga';
import { cartSaga } from './cart/CartSaga';

export function* rootSaga() {
  yield* all([fork(userSaga), fork(cartSaga), fork(watchUser), fork(appSaga)]);
}
