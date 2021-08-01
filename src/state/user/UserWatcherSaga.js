import { call, put, take } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel } from 'redux-saga';

import { api } from '../../api';
import { actions } from '../actions';

async function usersChannel(uid) {
	const db = database().ref(`/users/${uid}`);
	return eventChannel(emitter => {
		db.on('value', snapshot => {
			emitter({ user: snapshot.val() });
		});
		return () => db.off();
	});
}

export function* watchUser() {
	const uid = api.getUserInfo() && api.getUserInfo().uid;
	if (uid) {
		const channel = yield call(usersChannel, uid);
		try {
			while (true) {
				const { user } = yield take(channel);
				yield put(actions.user.setUserInfo(user));
			}
		} catch (e) {
			console.log(e);
		}
	}
}