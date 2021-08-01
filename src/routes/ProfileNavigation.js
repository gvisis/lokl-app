import React, { memo, useContext, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { getHeaderTitle } from '../utils/functions';
import { ROUTES } from './RouteNames';
import { ProfileEditView, ProfileView, SettingsView } from '../containers/ProfileFlow';

const Profile = createStackNavigator();

export const ProfileNavigation = memo(({ navigation, route }) => {

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: getHeaderTitle(route) });
	}, [navigation, route]);


	const theme = useContext(ThemeContext);

	const profileOptions = {
		headerStyle: {
			backgroundColor: theme.colors.primary80
		},
		headerTintColor: theme.colors.white,
		headerTitle: getHeaderTitle(route)
	}


	return (
		<Profile.Navigator>
			<Profile.Screen name={ROUTES.Profile} component={ProfileView} options={profileOptions} />
			<Profile.Screen name={ROUTES.ProfileEdit} component={ProfileEditView} options={profileOptions} />
			<Profile.Screen name={ROUTES.Settings} component={SettingsView} options={profileOptions} />
		</Profile.Navigator>
	);
})