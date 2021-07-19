import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { CustomBtn, Header } from '../../components';

export const HomeView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);

  const handleLogout = useFunction(dispatch, actions.user.logout());

  return (
    <HomeWrap>
      <Header title={t('home:title')} />
      <WelcomeTitle>Your email: {userInfo.email}!</WelcomeTitle>
      <ButtonWrap>
        <CustomBtn
          label={t('common:Logout')}
          secondary
          center
          activeOpacity={0.5}
          onPress={handleLogout}
        />
      </ButtonWrap>
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

const ButtonWrap = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
