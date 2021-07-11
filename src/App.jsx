import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles';
import Navigator from './routes/Navigator';
import { store } from './state/store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StatusBar hidden />
        <Navigator />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
