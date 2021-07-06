import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './RouteNames';
import {
  RegisterView,
  LoginView,
  ForgotPasswordView,
} from '../containers/LoginFlow';
import {LandingView} from '../containers/LandingFlow';

const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={ROUTES.Landing} component={LandingView} />
      <AuthStack.Screen name={ROUTES.Login} component={LoginView} />
      <AuthStack.Screen name={ROUTES.Register} component={RegisterView} />
      <AuthStack.Screen
        name={ROUTES.ForgotPassword}
        component={ForgotPasswordView}
      />
    </AuthStack.Navigator>
  );
};
