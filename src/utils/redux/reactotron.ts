import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';
import { reactotronRedux } from 'reactotron-redux';

export const initReactotron = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.configure({ host: '192.168.1.7' })
    .useReactNative({ errors: false })
    .use(reactotronRedux())
    .use(sagaPlugin({}))
    .connect()
    .clear();
  return Reactotron;
};
