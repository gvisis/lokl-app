import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';

import Navigator from './routes/Navigator';
import { configStore } from './state/store';

const { store, persistor } = configStore();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeArea>
          <Navigator />
        </SafeArea>
      </PersistGate>
    </Provider>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
export default App;
