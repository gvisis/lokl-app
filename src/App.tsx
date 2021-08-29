import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';

import Navigator from './routes/Navigator';
import { store } from './state/store';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <SafeArea>
        <Navigator />
      </SafeArea>
    </Provider>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
export default App;
