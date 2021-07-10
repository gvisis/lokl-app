import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';

import Navigator from './routes/Navigator';
import './utils/locale';
import { store } from './state/store';
import { theme } from './styles';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar hidden />
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
