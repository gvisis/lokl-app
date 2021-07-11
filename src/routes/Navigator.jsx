import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Button, StatusBar, Switch } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ScreenLoader } from '../components';
import { actions } from '../state/actions';
// Navigations routes
import { HomeNavigation } from './HomeNavigation';
import { AuthNavigation } from './AuthNavigation';

const Navigator = () => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();
  const [themeSwitch, setThemeSwitch] = useState(true);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(actions.ui.setOnSync('user', false));
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const switchTheme = () => {
    dispatch(actions.ui.setTheme(!themeSwitch));
    setThemeSwitch(!themeSwitch);
  };
  const { theme } = useSelector(state => state.ui);

  const Stack = createStackNavigator();
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar hidden />
        <Button title="Switch theme" onPress={switchTheme} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Home" component={HomeNavigation} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navigator;
