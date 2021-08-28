import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

import { ROUTES } from './RouteNames';
import { RootStackParamList } from '../types/general';
import { CartAddressView, CartItemsView } from '../containers/CartFlow';
import { CartFooter, Container } from '../components';

const TopBar = createMaterialTopTabNavigator<RootStackParamList>();

export const CartNavigation: React.FC = () => {
  const { quantity, total } = useSelector(state => state.cart);
  return (
    <Container>
      <TopBar.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}>
        <TopBar.Screen
          name={ROUTES.CartItemsView}
          component={CartItemsView}
          options={{ tabBarLabel: 'Cart' }}
        />
        <TopBar.Screen
          name={ROUTES.CartAddressView}
          component={CartAddressView}
          options={{ tabBarLabel: 'Address' }}
        />
        <TopBar.Screen
          name={'Payment'}
          component={CartItemsView}
          options={{ tabBarLabel: 'Payment' }}
        />
      </TopBar.Navigator>
      <CartFooter quantity={quantity} total={total} />
    </Container>
  );
};
