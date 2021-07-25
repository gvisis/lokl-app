import { all, fork } from 'redux-saga/effects';

import { userSaga } from './user/UserSagas';
import { watchUser } from './user/UserWatcherSaga';

export function* rootSaga() {
	yield all([
		fork(userSaga),
		fork(watchUser),
	]);
}