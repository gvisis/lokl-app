import React, { useContext } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

import { ROUTES } from './RouteNames';
import {
  AddEditAddressView,
  AddressView,
  ProfileEditView,
  ProfileView,
  SettingsView,
} from '../containers/ProfileFlow';
import { ComponentNavProps, RootStackParamList } from '../types/general';
import { getHeaderTitle } from '../utils/functions';

const Profile = createStackNavigator<RootStackParamList>();

export const ProfileNavigation: React.FC<ComponentNavProps<ROUTES.Profile>> = ({
  route,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Profile.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTintColor: theme.colors.white,
        headerTitle: getHeaderTitle(getFocusedRouteNameFromRoute(route)),
        headerTitleStyle: {
          fontFamily: theme.fonts.family.bentonBook,
          textTransform: 'capitalize',
        },
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Profile.Screen name={ROUTES.Profile} component={ProfileView} />
      <Profile.Screen name={ROUTES.ProfileEdit} component={ProfileEditView} />
      <Profile.Screen name={ROUTES.Address} component={AddressView} />
      <Profile.Screen name={ROUTES.AddAddress} component={AddEditAddressView} />
      <Profile.Screen name={ROUTES.Settings} component={SettingsView} />
    </Profile.Navigator>
  );
};
