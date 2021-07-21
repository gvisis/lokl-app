import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native';
import styled from 'styled-components/native';

import { ROUTES } from '../../routes/RouteNames';
import { Header } from '../../components';

export const ProfileView = ({ navigation }) => {
	const { t } = useTranslation();

	return (
		<HomeWrap>
			<Header title={t('home:title')} />
			<WelcomeTitle>Profile view!</WelcomeTitle>
			<Button
				title="Go to Profile Edit"
				onPress={() => navigation.navigate(ROUTES.ProfileEdit)}
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
