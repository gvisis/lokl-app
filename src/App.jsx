import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import Navigator from './routes/Navigator';
import './utils/locale';
import {store} from './state/store';

function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <Navigator />
    </Provider>
  );
}

export default App;
