import { call, put, take } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import { EventChannel, eventChannel } from 'redux-saga';
import i18n from 'i18next';

import { actions } from '../actions';
import { UserProps } from '../user/UserInterfaces';
import { ERROR_TYPE } from '../../utils/variables';
import { AdsProps } from '../app/AppInterfaces';

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
  try {
    // ts error, dunno how to fix it now
    const channel: EventChannel<AllUsersProps> = yield* call(allUsersChannel);
    while (true) {
      const { users } = yield* take(channel);
      const allAds: AdsProps[] = Object.values(users)
        .filter(user => user.ads)
        .flatMap(user => Object.values(user.ads));
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
