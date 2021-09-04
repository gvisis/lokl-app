import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getTabIconName } from '../utils/functions';
import { ROUTES } from './RouteNames';
import { RootStackParamList } from '../types/general';
import { CartNavigation } from './CartNavigation';
import { HomeView } from '../containers/HomeFlow';
import { AdsView } from '../containers/AdsFlow';
import { ProfileView } from '../containers/ProfileFlow';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabNavigation: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { quantity } = useSelector(state => state.cart);

  const cartTabOptions = {
    tabBarLabel: t('cart:title'),
    tabBarBadge: quantity ? quantity : null,
    tabBarBadgeStyle: {
      backgroundColor: theme.colors.secondaryBtn,
      color: theme.colors.white,
    },
  };
  const tabNavOptions = {
    activeTintColor: theme.colors.secondaryBtn,
    inactiveTintColor: theme.colors.lightGrey,
    style: {
      backgroundColor: theme.colors.background,
      elevation: 0,
      borderTopWidth: 0,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color, size }) => (
          <Icon name={getTabIconName(route.name)} size={size} color={color} />
        ),
      })}
      tabBarOptions={tabNavOptions}
    >
      <Tab.Screen
        name={ROUTES.Home}
        component={HomeView}
        options={{ tabBarLabel: t('home:home') }}
      />

      <Tab.Screen
        name={ROUTES.AdsTab}
        component={AdsView}
        options={{ tabBarLabel: t('ads:title') }}
      />
      <Tab.Screen
        name={ROUTES.CartTab}
        component={CartNavigation}
        options={cartTabOptions}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={ProfileView}
        options={{ tabBarLabel: t('profile:title') }}
      />
    </Tab.Navigator>
  );
};
