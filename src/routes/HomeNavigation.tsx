import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { ProductView } from '../containers/ProductFlow';
import { CategoryView, CompanyView } from '../containers/CompanyFlow';
import { HomeView } from '../containers/HomeFlow';
import { RootStackParamList } from './RootStackParamList';

const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeNavigation: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontFamily: theme.fonts.family.bentonBook,
          textTransform: 'capitalize',
        },
      }}>
      <HomeStack.Screen
        name={ROUTES.Home}
        component={HomeView}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={ROUTES.SingleProduct} component={ProductView} />
      <HomeStack.Screen name={ROUTES.SingleCompany} component={CompanyView} />
      <HomeStack.Screen
        name={ROUTES.CompanyCategory}
        component={CategoryView}
      />
    </HomeStack.Navigator>
  );
};
