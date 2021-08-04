import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { CustomBtn, Header } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { useFunction } from '../../utils/hooks';

export const LandingView: React.FC = ({ navigation }) => {
  const landingPageBgImage = require('../../assets/images/landingPageImage.png');
  const { t } = useTranslation();

  const navigateToLogin = useFunction(navigation.navigate, ROUTES.Login);
  const navigateToSignup = useFunction(navigation.navigate, ROUTES.Signup);

  return (
    <Wrapper>
      <Header title={t('landing:appName')} />
      <LandingBackground source={landingPageBgImage} resizeMethod="scale" />
      <ButtonWrappper>
        <CustomBtn
          label={t('common:Login to')}
          center
          activeOpacity={0.8}
          onPress={navigateToLogin}
        />
        <CustomBtn
          label={t('common:Create account')}
          center
          activeOpacity={0.8}
          onPress={navigateToSignup}
        />
      </ButtonWrappper>
    </Wrapper>
  );
};

const ButtonWrappper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const LandingBackground = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;
