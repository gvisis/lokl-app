import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';

export const ProfileView: React.FC = ({ navigation }) => {
  const { t } = useTranslation();
  const handleProfileEditNav = useFunction(
    navigation.navigate,
    ROUTES.ProfileEdit,
  );
  const handleSettingsNav = useFunction(navigation.navigate, ROUTES.Settings);
  const dispatch = useDispatch();

  const handleLogout = useFunction(dispatch, actions.user.logout());
  return (
    <HomeWrap>
      <WelcomeTitle>Profile view!</WelcomeTitle>
      <Button title="Go to Profile Edit" onPress={handleProfileEditNav} />
      <Button title="Go to Settings" onPress={handleSettingsNav} />
      <Button title={t('common:Logout')} onPress={handleLogout} />
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
