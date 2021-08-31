import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import {
  getFocusedRouteNameFromRoute,
  useRoute,
} from '@react-navigation/native';

import { ROUTES } from './RouteNames';
import {
  AddEditAddressView,
  AddressView,
  ProfileEditView,
  ProfileView,
  SettingsView,
} from '../containers/ProfileFlow';
import { getHeaderTitle } from '../utils/functions';
import { RootStackParamList } from '../types/general';

const Profile = createStackNavigator<RootStackParamList>();

export const ProfileNavigation: React.FC = () => {
  const theme = useTheme();
  const route = useRoute();

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
      }}
    >
      <Profile.Screen name={ROUTES.Profile} component={ProfileView} />
      <Profile.Screen name={ROUTES.ProfileEdit} component={ProfileEditView} />
      <Profile.Screen name={ROUTES.Address} component={AddressView} />
      <Profile.Screen name={ROUTES.AddAddress} component={AddEditAddressView} />
      <Profile.Screen name={ROUTES.Settings} component={SettingsView} />
    </Profile.Navigator>
  );
};
