import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled, { ThemeContext } from 'styled-components/native';

import { ROUTES } from './RouteNames';
import { ProfileNavigation } from '.';
import { HomeView } from '../containers/HomeFlow';

const Tab = createBottomTabNavigator();


export const HomeNavigation = () => {
	const theme = React.useContext(ThemeContext);
	return (
		<Tab.Navigator
			screenOptions={
				({ route }) => (
					{
						// eslint-disable-next-line react/display-name
						tabBarIcon: ({ color, size }) => {
							let iconName = route.name === ROUTES.Home ? 'home' : 'user'
							return <Icon name={iconName} size={size} color={color} />;
						}
					}
				)
			}
			tabBarOptions={{
				activeTintColor: theme.colors.secondaryBtn,
				inactiveTintColor: theme.colors.lightGrey,
			}}
		>
			<Tab.Screen name={ROUTES.Home} component={HomeView} options={{ tabBarLabel: 'Home' }} />
			<Tab.Screen name={ROUTES.Profile} component={ProfileNavigation} options={{ tabBarLabel: 'Profile' }} />
		</Tab.Navigator>
	)
}
