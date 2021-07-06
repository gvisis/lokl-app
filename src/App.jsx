import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View, Text} from 'react-native';

import {AppProvider} from './state/context';
import Navigator from './routes/Navigator';

function App() {
  return (
    <AppProvider>
      <StatusBar hidden />
      <Navigator />
    </AppProvider>
  );
}

export default App;
