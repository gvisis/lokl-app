import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from './RouteNames';
import { ProfileEditView, ProfileView } from '../containers/ProfileFlow';

const Profile = createStackNavigator();

export const ProfileNavigation = () => (
	<Profile.Navigator>
		<Profile.Screen name={ROUTES.Profile} component={ProfileView} />
		<Profile.Screen name={ROUTES.ProfileEdit} component={ProfileEditView} />
	</Profile.Navigator>
);