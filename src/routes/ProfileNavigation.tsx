import React, { useContext } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import { RouteProp } from '@react-navigation/core';

import { getHeaderTitle } from '../utils/functions';
import { ROUTES } from './RouteNames';
import {
  ProfileEditView,
  ProfileView,
  SettingsView,
} from '../containers/ProfileFlow';
import { RootStackParamList } from './RootStackParamList';

type ProfileNavRouteProps = RouteProp<RootStackParamList, ROUTES.Profile>;
type ProfileNavProps = {
  route: ProfileNavRouteProps;
};

const Profile = createStackNavigator<RootStackParamList>();

export const ProfileNavigation: React.FC<ProfileNavProps> = ({ route }) => {
  const theme = useContext(ThemeContext);

  const profileOptions = {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.secondary1,
    headerTitle: getHeaderTitle(route),
  };

  return (
    <Profile.Navigator>
      <Profile.Screen
        name={ROUTES.Profile}
        component={ProfileView}
        options={profileOptions}
      />
      <Profile.Screen
        name={ROUTES.ProfileEdit}
        component={ProfileEditView}
        options={profileOptions}
      />
      <Profile.Screen
        name={ROUTES.Settings}
        component={SettingsView}
        options={profileOptions}
      />
    </Profile.Navigator>
  );
};
