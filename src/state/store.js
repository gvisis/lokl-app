import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';

import { rootSaga } from './sagas';
import { rootReducer } from './reducers';
import configureSaga from '../utils/redux/configureSaga';
import storeRegistry from '../utils/redux/storeRegistry';

const configStore = (initialState = {}) => {
	let sagaMonitor = undefined;

	const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
	const appliedMiddleware = applyMiddleware(sagaMiddleware);
	const store = createStore(rootReducer, initialState, appliedMiddleware);
	configureSaga(sagaMiddleware, rootSaga);
	return { store };
};
const { store } = configStore();
storeRegistry.register(store);
export { store };
