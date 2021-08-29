import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

export const initReactotron = () => {
  Reactotron.configure({ host: '192.168.1.7' })
    .useReactNative({ errors: false })
    .use(reactotronRedux())
    .use(sagaPlugin({}))
    .connect()
    .clear();
  return Reactotron;
};
