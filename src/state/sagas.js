import { all, fork } from 'redux-saga/effects';

import userSaga from './user/UserSagas';

export function* rootSaga() {
	yield all([
		fork(userSaga),
	]);
}