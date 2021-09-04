import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

import { Container, CustomBtn } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { useFunction } from '../../utils/hooks';

export const LandingView: React.FC = () => {
  const landingPageBgImage = require('../../assets/images/landingLogo.png');
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const navigateToLogin = useFunction(navigate, ROUTES.Login);

  return (
    <Container>
      <LogoContainer>
        <Logo source={landingPageBgImage} />
      </LogoContainer>
      <ButtonWrappper>
        <CustomBtn
          label={t('common:getStarted')}
          center
          activeOpacity={0.8}
          onPress={navigateToLogin}
        />
      </ButtonWrappper>
    </Container>
  );
};

const LogoContainer = styled.View`
  flex: 0.4;
  padding: 10px 0;
  margin: auto 0;
`;

const Logo = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

const ButtonWrappper = styled.View`
  flex: 0.25;
  width: 100%;
`;
