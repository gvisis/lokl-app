import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ThemeContext } from 'styled-components/native';

import { getTabIconName, getTabLabel } from '../utils/functions';
import { ROUTES } from './RouteNames';
import { AdsNavigation, HomeNavigation, ProfileNavigation } from '.';
import { RootStackParamList } from '../types/general';
import { CartNavigation } from './CartNavigation';

const Tab = createBottomTabNavigator<RootStackParamList>();
type TabNavProps = BottomTabNavigationProp<RootStackParamList, ROUTES.TabNav>;

export const TabNavigation: React.FC<TabNavProps> = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color, size }) => {
          const iconName: string = getTabIconName(route.name);
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: getTabLabel(route.name),
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.secondaryBtn,
        inactiveTintColor: theme.colors.lightGrey,
      }}>
      <Tab.Screen name={ROUTES.HomeTab} component={HomeNavigation} />
      <Tab.Screen name={ROUTES.AdsTab} component={AdsNavigation} />
      <Tab.Screen name={ROUTES.CartTab} component={CartNavigation} />
      <Tab.Screen name={ROUTES.Profile} component={ProfileNavigation} />
    </Tab.Navigator>
  );
};
