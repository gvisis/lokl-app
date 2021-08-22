import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { RootStackParamList } from '../types/general';
import {
  CartAddressView,
  CartItemsView,
  CartView,
} from '../containers/CartFlow';

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
        options={{
          headerTitle: 'Shopping cart',
        }}
      />
      <CartStack.Screen
        name={ROUTES.CartAddressView}
        component={CartAddressView}
        options={{ headerTitle: 'Shipping address' }}
      />
    </CartStack.Navigator>
  );
};

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Button, useWindowDimensions } from 'react-native';
// import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// import { CartAddressView, CartItemsView } from '../containers/CartFlow';
// import { CartFooter, Container } from '../components';
// import { ROUTES } from './RouteNames';

// export const CartNavigation: React.FC = () => {
//   const { quantity, total } = useSelector(state => state.cart);

//   const renderScene = SceneMap({
//     [ROUTES.CartItemView]: CartItemsView,
//     [ROUTES.CartAddressView]: CartAddressView,
//   });

//   const layout = useWindowDimensions();

//   const [index, setIndex] = useState(0);

//   const handleIndexChange = index => {
//     if (index != 1) {
//       setIndex({ index });
//     }
//     return index;
//   };

//   const routes = [
//     { key: ROUTES.CartItemView, title: 'Cart' },
//     { key: ROUTES.CartAddressView, title: 'Address' },
//   ];
//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{ backgroundColor: 'red' }}
//       style={{ backgroundColor: 'yellow' }}
//       activeColor={'blue'}
//       inactiveColor={'red'}
//     />
//   );

//   return (
//     <Container>
//       <TabView
//         navigationState={{ handleIndexChange, routes }}
//         renderScene={renderScene}
//         // swipeEnabled={quantity !== 0}
//         renderTabBar={renderTabBar}
//         onIndexChange={handleIndexChange}
//         initialLayout={{ width: layout.width }}
//       />
//       <Button title="next" onPress={() => console.log('t')} />
//       <CartFooter quantity={quantity} total={total} />
//     </Container>
//   );
// };
