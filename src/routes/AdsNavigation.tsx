import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { AddAdView, AdsView, SingleAdView } from '../containers/AdsFlow';
import { RootStackParamList } from '../types/general';

const AdsStack = createStackNavigator<RootStackParamList>();

export const AdsNavigation: React.FC = () => {
  const theme = useTheme();
  return (
    <AdsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontFamily: theme.fonts.family.bentonBook,
        },
        gestureDirection: 'horizontal',

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AdsStack.Screen
        name={ROUTES.Ads}
        component={AdsView}
        options={{ headerShown: false }}
      />
      <AdsStack.Screen
        name={ROUTES.AddAd}
        component={AddAdView}
        options={{ headerTitle: 'Create an ad' }}
      />
      <AdsStack.Screen name={ROUTES.SingleAdView} component={SingleAdView} />
    </AdsStack.Navigator>
  );
};
