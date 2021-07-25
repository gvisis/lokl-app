import { call, put, take } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel } from 'redux-saga';

import { api } from '../../api';
import { actions } from '../actions';

const usersChannel = uid =>
	eventChannel(emit => {
		database()
			.ref(`users/${uid}`)
			.on(
				'value',
				snapshot => {
					emit({ user: snapshot.val() });
				},
				errorObject => {
					console.warn('errorobject', errorObject);
				},
			);
		return () => database.off();
	});

export function* watchUser() {
	if (api.getUserInfo()) {
		const userId = api.getUserInfo().uid;
		const channel = yield call(usersChannel, userId);
		try {
			while (true) {
				const { user } = yield take(channel);
				yield put(actions.user.updateUserInfo(user))
			}
		} catch (e) {
			console.warn('erroras', e);
		}
	}
}