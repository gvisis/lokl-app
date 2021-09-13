import createSagaMiddleware, { SagaMiddleware, SagaMonitor } from 'redux-saga';
import { compact } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import { rootSaga } from './sagas';
import { PersistedAppState, rootReducer } from './reducers';
import { initReactotron } from '../utils/redux/reactotron';
import { storage } from '../utils/storage';
import configureSaga from '../utils/redux/configureSaga';
import storeRegistry from '../utils/redux/storeRegistry';

const persistorConfig = {
  key: '@<Lokl>:state',
  storage: storage,
  whitelist: ['app', 'cart'],
};

export const configStore = (initialState?: PersistedAppState) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;
  const Reactotron = initReactotron();
  sagaMonitor = Reactotron.createSagaMonitor();
  reactorEnhancer = Reactotron.createEnhancer();

  const sagaMiddleware: SagaMiddleware<SagaMonitor> = createSagaMiddleware({
    sagaMonitor,
  });
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));

  const persistedReducer = persistReducer(persistorConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancers as any);
  const persistor = persistStore(store);

  configureSaga(sagaMiddleware, rootSaga);
  return { store, persistor };
};

const { store } = configStore();
storeRegistry.register(store);
