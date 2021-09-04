// fixes duplicate sagas when using React Native fast refresh
// https://github.com/redux-saga/redux-saga/issues/1961

import { SagaMiddleware } from 'redux-saga';

export type RootSaga = (...args: any[]) => IterableIterator<any>;

let sagaRunner: unknown;

export default (sagaMiddleware: SagaMiddleware<S>, rootSaga: RootSaga) => {
  if (__DEV__ && module.hot && sagaRunner) {
    sagaRunner.cancel();
  }
  sagaRunner = sagaMiddleware.run(rootSaga);
};
