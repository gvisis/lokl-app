import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { ScreenLoader } from '../components';
import { actions } from '../state/actions';
// Navigations routes
import { HomeNavigation } from './HomeNavigation';
import { AuthNavigation } from './AuthNavigation';

const Navigator = () => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();
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

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeNavigation} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
