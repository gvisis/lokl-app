import { call, put, take } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import { eventChannel } from 'redux-saga';

import { api } from '../../api';
import { actions } from '../actions';
import { ERROR_TYPE } from '../../utils/variables';
import { UserProps } from './UserInterfaces';

async function usersChannel(uid: string) {
  const db = database().ref(`/users/${uid}`);
  return eventChannel(emitter => {
    db.on('value', snapshot => {
      emitter({ user: snapshot.val() });
    });
    return () => db.off();
  });
}

interface UserWatcherProps {
  user?: UserProps;
}

export function* watchUser() {
  const uid: string = api.getUserInfo() && api.getUserInfo().uid;
  if (uid) {
    const channel = yield* call(usersChannel, uid as string);
    try {
      while (true) {
        const { user }: UserWatcherProps = yield* take(channel);
        yield* put(actions.user.setUserInfo(user));
      }
    } catch (e) {
      yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
    }
  }
}
