import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './RouteNames';
import {HomeView} from '../containers/HomeFlow';

const HomeStack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={ROUTES.Home} component={HomeView} />
    </HomeStack.Navigator>
  );
};
