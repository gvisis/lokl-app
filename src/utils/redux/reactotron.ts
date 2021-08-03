import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';
import { reactotronRedux } from 'reactotron-redux';

export const initReactotron = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.configure({
    host: scriptHostname,
  })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin({ except: [''] }))
    .connect()
    .clear();

  return Reactotron;
};

// Expected 1 arguments, but got 0.ts(2554)
// index.d.ts(4, 26): An argument for 'pluginConfig' was not provided.
// (alias) sagaPlugin(pluginConfig: PluginConfig): (reactotron: Reactotron<ReactotronCore>) => {
//     features: {
//         createSagaMonitor: () => SagaMonitor;
//     };
// }
// import sagaPlugin
