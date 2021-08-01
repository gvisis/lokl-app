import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import { capitalizeFirst, getHeaderTitle } from '../utils/functions';
import { ROUTES } from './RouteNames';
import { ProfileEditView, ProfileView } from '../containers/ProfileFlow';

const Profile = createStackNavigator();

export const ProfileNavigation = ({ navigation, route }) => {

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: getHeaderTitle(route.name) });
	}, [navigation, route]);


	const theme = React.useContext(ThemeContext);

	const profileOptions = { headerStyle: { backgroundColor: theme.colors.primary80 }, headerTintColor: theme.colors.white }

	return (
		<Profile.Navigator>
			<Profile.Screen name={ROUTES.Profile} component={ProfileView} options={profileOptions} />
			<Profile.Screen name={ROUTES.ProfileEdit} component={ProfileEditView} options={profileOptions} />
		</Profile.Navigator>
	);
}