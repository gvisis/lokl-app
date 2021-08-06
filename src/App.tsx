import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import Navigator from './routes/Navigator';
import { store } from './state/store';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
