import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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
  const loading = useSelector(state => state.ui.onSync.user);
  const { userInfo } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  //! Handle user state changes - TEMPORARY CODE!!!
  const onAuthStateChanged = user => {
    if (user) {
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(snap => dispatch(actions.user.setUserInfo(snap.val())));
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar hidden />

        <Stack.Navigator headerMode="none">
          {userInfo ? (
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
