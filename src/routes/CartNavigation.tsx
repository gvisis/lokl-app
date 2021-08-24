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
          options={{ tabBarLabel: 'Shopping cart' }}
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

// import React, { useContext } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { ThemeContext } from 'styled-components/native';

// import { ROUTES } from './RouteNames';
// import { RootStackParamList } from '../types/general';
// import {
//   CartAddressView,
//   CartItemsView,
//   CartView,
// } from '../containers/CartFlow';

// const CartStack = createStackNavigator<RootStackParamList>();

// export const CartNavigation: React.FC = () => {
//   const theme = useContext(ThemeContext);

//   return (
//     <CartStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: theme.colors.secondary,
//         },
//         headerTintColor: theme.colors.white,
//         headerTitleStyle: {
//           fontFamily: theme.fonts.family.bentonBook,
//           textTransform: 'capitalize',
//         },
//         headerShown: true,
//         headerTitleAlign: 'center',
//       }}>
//       <CartStack.Screen
//         name={ROUTES.Cart}
//         component={CartView}
//         options={{
//           headerTitle: 'Shopping cart',
//         }}
//       />
//       <CartStack.Screen
//         name={ROUTES.CartAddressView}
//         component={CartAddressView}
//         options={{ headerTitle: 'Shipping address' }}
//       />
//     </CartStack.Navigator>
//   );
// };
