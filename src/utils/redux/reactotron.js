import Reactotron from 'reactotron-react-native';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import sagaPlugin from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';
import { reactotronRedux } from 'reactotron-redux';

export const initReactotron = createSocketToFlipper => {
	const scriptURL = NativeModules.SourceCode.scriptURL || 'http://10.20.0.254';
	const scriptHostname = scriptURL.split('://')[1].split(':')[0];

	Reactotron.configure({
		host: scriptHostname,
		...(createSocketToFlipper ? { createSocket: path => new ReactotronFlipper(path) } : {}),
	})
		.useReactNative({ errors: false })
		.use(reactotronRedux())
		.use(sagaPlugin())
		.connect()
		.clear();

	return Reactotron;
};
