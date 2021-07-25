import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { GlobalErrorSuccess, ScreenLoader } from '../components';
import { AuthNavigation, HomeNavigation } from '.';
import { actions } from '../state/actions';

const Navigator = () => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();
  const loading = useSelector(state => state.ui.onSync.user);
  // const [themeSwitch, setThemeSwitch] = useState(true);

  const { theme } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  //! Handle user state changes - TEMPORARY CODE!!!
  async function onAuthStateChanged(user) {
    setUser(user);

    if (user) {
      try {
        const userDbRef = await database().ref(
          `users/${auth().currentUser.uid}`,
        );
        await userDbRef.once('value', snapshot =>
          dispatch(actions.user.setUserInfo(snapshot.val())),
        );
      } catch (error) {
        console.log('onauth', error);
      }
    }
    if (loading) dispatch(actions.ui.setOnSync('user', false));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  // Theme switcher
  // const handleThemeSwitch = () => {
  //   dispatch(actions.ui.setTheme(!themeSwitch));
  //   setThemeSwitch(!themeSwitch);
  // };

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar hidden />
        <Stack.Navigator headerMode="none">
          {user ? (
            <Stack.Screen name="Home" component={HomeNavigation} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigation} />
          )}
        </Stack.Navigator>
        {loading && (
          <ScreenLoader size={100} color={theme.colors.secondaryBtn} />
        )}
        <GlobalErrorSuccess />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default Navigator;
