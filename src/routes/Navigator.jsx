import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Navigations routes
import {HomeNavigation} from './HomeNavigation';
import {AuthNavigation} from './AuthNavigation';

// Global Context
import {useGlobalContext} from '../state/context';

const Navigator = () => {
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);
  const {isLoggedIn} = useGlobalContext();
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

  if (isLoading) return null;

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeNavigation}
            initalParams={{email: user.email}}
          />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
