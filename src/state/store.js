import createSagaMiddleware from 'redux-saga';
import { compact } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';

import { rootSaga } from './sagas';
import { rootReducer } from './reducers';
import { initReactotron } from '../utils/redux/reactotron';
import configureSaga from '../utils/redux/configureSaga';
import storeRegistry from '../utils/redux/storeRegistry';

const configStore = (initialState = {}) => {
	let sagaMonitor = undefined;
	let reactorEnhancer = undefined;
	const Reactotron = initReactotron(true);
	sagaMonitor = Reactotron.createSagaMonitor();
	reactorEnhancer = Reactotron.createEnhancer();
	console.tron = Reactotron;
	const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
	const appliedMiddleware = applyMiddleware(sagaMiddleware);
	const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));
	const store = createStore(rootReducer, initialState, enhancers);
	configureSaga(sagaMiddleware, rootSaga);
	return { store };
};
const { store } = configStore();
storeRegistry.register(store);
export { store };