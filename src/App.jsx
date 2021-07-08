import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {AppProvider, useGlobalContext} from './state/context';
import Navigator from './routes/Navigator';
import './utils/locale';

function App() {
  console.warn(useGlobalContext(), 'app');
  return (
    <AppProvider>
      <StatusBar hidden />
      <Navigator />
    </AppProvider>
  );
}

export default App;
