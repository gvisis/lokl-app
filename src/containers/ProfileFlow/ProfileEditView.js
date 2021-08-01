import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

export const ProfileEditView = () => {
	const { t } = useTranslation();

	return (
		<HomeWrap>
			<WelcomeTitle>Profile EDIT view!</WelcomeTitle>
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
