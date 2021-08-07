import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from './RouteNames';
import {
  ForgotPasswordView,
  LoginView,
  RegisterView,
} from '../containers/LoginFlow';
import { LandingView } from '../containers/LandingFlow';
import { RootStackParamList } from './RootStackParamList';

const AuthStack = createStackNavigator<RootStackParamList>();

export const AuthNavigation: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={ROUTES.Signup} component={RegisterView} />
    <AuthStack.Screen name={ROUTES.Login} component={LoginView} />
    <AuthStack.Screen name={ROUTES.Landing} component={LandingView} />
    <AuthStack.Screen
      name={ROUTES.ForgotPassword}
      component={ForgotPasswordView}
    />
  </AuthStack.Navigator>
);
