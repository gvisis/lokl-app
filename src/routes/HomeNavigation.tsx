import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from 'styled-components/native';

import { capitalizeFirst } from '../utils/functions';
import { ROUTES } from './RouteNames';
import { ProfileNavigation } from '.';
import { HomeView } from '../containers/HomeFlow';

const Tab = createBottomTabNavigator();

export const HomeNavigation: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color, size }) => {
          const iconName: string = route.name === ROUTES.Home ? 'home' : 'user';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.secondaryBtn,
        inactiveTintColor: theme.colors.lightGrey,
      }}>
      <Tab.Screen
        name={ROUTES.Home}
        component={HomeView}
        options={{
          tabBarLabel: capitalizeFirst(ROUTES.Home),
        }}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={ProfileNavigation}
        options={{ tabBarLabel: capitalizeFirst(ROUTES.Profile) }}
      />
    </Tab.Navigator>
  );
};
