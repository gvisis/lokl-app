import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from '../routes/RouteNames';
import {
  RegisterView,
  LoginView,
  ForgotPasswordView,
} from '../containers/LoginFlow';

const LoginStack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <LoginStack.Navigator>
        <LoginStack.Screen name={ROUTES.Login} component={LoginView} />
        <LoginStack.Screen name={ROUTES.Register} component={RegisterView} />
        <LoginStack.Screen
          name={ROUTES.ForgotPassword}
          component={ForgotPasswordView}
        />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
