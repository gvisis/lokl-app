import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './RouteNames';

import {LandingPageView} from '../containers/LandingFlow';
import {HomeView} from '../containers/HomeFlow/';
import {Header, CustomBtn} from '../components/';

import {useGlobalContext} from '../state/context';

const Navigator = () => {
  const {isLoggedIn} = useGlobalContext();
  console.warn(isLoggedIn);
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name={ROUTES.Home} component={HomeView} />
        ) : (
          <Stack.Screen name={ROUTES.Landing} component={LandingPageView} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
