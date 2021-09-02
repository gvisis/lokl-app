import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { themes } from '../styles';
import { GlobalErrorSuccess, ScreenLoader } from '../components';
import { AuthNavigation, TabNavigation } from '.';
import { actions } from '../state/actions';
import { RootStackParamList } from '../types/general';
import { ROUTES } from './RouteNames';
import { THEME } from '../utils/variables';

const Navigator: React.FC = () => {
  // Set an initializing state whilst Firebase connects
  const loading = useSelector(state => state.ui.onSync.user);
  const { userInfo } = useSelector(state => state.user);
  const { appTheme } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const Stack = createStackNavigator<RootStackParamList>();
  const theme = appTheme === THEME.LIGHT ? themes.light : themes.dark;
  const onAuthStateChanged = (user: FirebaseAuthTypes.User): void => {
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

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <ScreenLoader size={100} color={theme.colors.secondaryBtn} />
      </ThemeProvider>
    );
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.secondary} />
        <Stack.Navigator headerMode="none">
          {userInfo ? (
            <Stack.Screen name={ROUTES.TabNav} component={TabNavigation} />
          ) : (
            <Stack.Screen name={ROUTES.AuthNav} component={AuthNavigation} />
          )}
        </Stack.Navigator>
        <GlobalErrorSuccess />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default Navigator;
