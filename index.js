import { AppRegistry } from 'react-native';

import './src/utils/locale';
import App from './src/App';
import { name as appName } from './app.json';

if (__DEV__) {
	import('./src/utils/redux/reactotron').then(() =>
		console.log('Reactotron Configured'),
	);
}

AppRegistry.registerComponent(appName, () => App);
