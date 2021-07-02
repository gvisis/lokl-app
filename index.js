import {AppRegistry} from 'react-native';

import App from './App';
import './src/utils/locale';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
