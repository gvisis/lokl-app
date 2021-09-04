import { call, put, take } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import { EventChannel, eventChannel } from 'redux-saga';
import i18n from 'i18next';

import { api } from '../../api';
import { actions } from '../actions';
import { UserProps } from '../user/UserInterfaces';
import { ERROR_TYPE } from '../../utils/variables';

function allUsersChannel() {
  const dbAllusersRef = database().ref(`/users/`);
  return eventChannel(emitter => {
    dbAllusersRef.on('value', snapshot => {
      emitter({ users: snapshot.val() });
    });
    return () => dbAllusersRef.off();
  });
}
interface AllUsersProps {
  users: UserProps;
}

export function* adsWatcher() {
  const uid: string = api.getUserInfo() && api.getUserInfo().uid;
  if (uid) {
    const channel: EventChannel<AllUsersProps> = yield* call(allUsersChannel);
    try {
      while (true) {
        const { users }: AllUsersProps = yield* take(channel);
        const allAds = Object.values(users)
          .filter(user => user.ads)
          .map(user => Object.values(user.ads))
          .flat();
        yield* put(actions.app.setAllAds(allAds));
      }
    } catch (e) {
      yield* put(
        actions.ui.setStatus(
          ERROR_TYPE.ERROR,
          true,
          i18n.t('errors:watcher/fetchingAds'),
        ),
      );
    }
  }
}
