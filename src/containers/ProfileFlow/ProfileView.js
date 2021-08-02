import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';

import { ROUTES } from '../../routes/RouteNames';
import { useFunction } from '../../utils/hooks';


export const ProfileView = ({ navigation }) => {

	const handleProfileEditNav = useFunction(navigation.navigate, ROUTES.ProfileEdit);
	const handleSettingsNav = useFunction(navigation.navigate, ROUTES.Settings);

	return (
		<HomeWrap>
			<WelcomeTitle>Profile view!</WelcomeTitle>
			<Button
				title="Go to Profile Edit"
				onPress={handleProfileEditNav}
			/>
			<Button
				title="Go to Settings"
				onPress={handleSettingsNav}
			/>

		</HomeWrap>
	);
};

const HomeWrap = styled.View`
			flex: 1;
			`;

const WelcomeTitle = styled.Text`
			color: ${({ theme }) => theme.colors.primary};
			font-size: ${({ theme }) => theme.fonts.size.xl}px;
			text-align: center;
			padding: 10px;
			flex: 4;
			`;
