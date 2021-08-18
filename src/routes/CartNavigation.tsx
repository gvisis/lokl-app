import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { RootStackParamList } from '../types/general';
import { CartView } from '../containers/CartFlow';

const CartStack = createStackNavigator<RootStackParamList>();

export const CartNavigation: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <CartStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontFamily: theme.fonts.family.bentonBook,
          textTransform: 'capitalize',
        },
        headerShown: true,
        headerTitleAlign: 'center',
      }}>
      <CartStack.Screen
        name={ROUTES.Cart}
        component={CartView}
        options={{ headerTitle: 'Shopping cart' }}
      />
    </CartStack.Navigator>
  );
};
