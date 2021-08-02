import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import Navigator from './routes/Navigator';
import { store } from './state/store';

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
