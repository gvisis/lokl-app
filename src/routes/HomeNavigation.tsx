import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { ProductView } from '../containers/ProductFlow';
import { CompanyView, CompCategoryView } from '../containers/CompanyFlow';
import { CategoriesView, HomeView } from '../containers/HomeFlow';
import { RootStackParamList } from '../types/general';

const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeNavigation: React.FC = () => {
  const theme = useTheme();
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
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen
        name={ROUTES.Home}
        component={HomeView}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={ROUTES.SingleProduct} component={ProductView} />
      <HomeStack.Screen name={ROUTES.SingleCompany} component={CompanyView} />
      <HomeStack.Screen
        name={ROUTES.SingleCategory}
        component={CategoriesView}
      />
      <HomeStack.Screen
        name={ROUTES.CompanyCategory}
        component={CompCategoryView}
      />
    </HomeStack.Navigator>
  );
};
