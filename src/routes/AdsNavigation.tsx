import React, { useContext } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { AddAdView, AdsView } from '../containers/AdsFlow';
import { RootStackParamList } from '../types/general';

const AdsStack = createStackNavigator<RootStackParamList>();

export const AdsNavigation: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <AdsStack.Navigator
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
      <AdsStack.Screen
        name={ROUTES.Ads}
        component={AdsView}
        options={{ headerShown: false }}
      />
      <AdsStack.Screen name={ROUTES.AddAd} component={AddAdView} />
    </AdsStack.Navigator>
  );
};
