import { call, put, take } from 'typed-redux-saga';
import database from '@react-native-firebase/database';
import { EventChannel, eventChannel } from 'redux-saga';
import i18next from 'i18next';

import { actions } from '../actions';
import { ERROR_TYPE } from '../../utils/variables';
import { sortAsc } from '../../utils/functions';
import { CompanyProps } from '../app/AppInterfaces';

interface AllCompanies {
  [key: string]: CompanyProps;
}

interface CompaniesWatcher {
  companies: AllCompanies;
}

function allCompaniesChannel() {
  const dbAllCompaniesRef = database().ref(`/companies/`);
  return eventChannel(emitter => {
    dbAllCompaniesRef.on('value', snapshot => {
      emitter({ companies: snapshot.val() });
    });
    return () => dbAllCompaniesRef.off();
  });
}

export function* companiesWatcher() {
  const channel: EventChannel<CompaniesWatcher> = yield* call(
    allCompaniesChannel,
  );

  try {
    while (true) {
      const { companies }: CompaniesWatcher = yield* take(channel);
      const companiesArray: CompanyProps[] = Object.values(companies).sort(
        (a, b) => sortAsc(a.title, b.title),
      );
      yield* put(actions.app.setAllCompanies(companiesArray));
      const filteredComps = companiesArray
        .filter(company => company.produce.length > 0)
        .map(company => company.produce)
        .reduce((firstValue, secondValue) => firstValue.concat(secondValue));
      yield* put(actions.app.setProducts(filteredComps));
    }
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18next.t('errors:watcher/companies'),
      ),
    );
  }
}
