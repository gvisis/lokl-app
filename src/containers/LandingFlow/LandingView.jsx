import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { CustomBtn, Header } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { useFunction } from '../../utils/hooks';

export const LandingView = ({ navigation }) => {
  const landingPageBgImage = require('../../assets/images/landingPageImage.png');
  const { t } = useTranslation();

  const navigateToLogin = useFunction(navigation.navigate, ROUTES.Login);
  const navigateToRegister = useFunction(navigation.navigate, ROUTES.Register);

  return (
    <Wrapper>
      <Header title={t('landing:appName')} height="5px" />
      <LandingBackground source={landingPageBgImage} resizeMethod="scale" />
      <ButtonWrappper>
        <CustomBtn
          text={t('common:Login to')}
          center
          activeOpacity={0.8}
          onPress={navigateToLogin}
        />
        <CustomBtn
          text={t('common:Create account')}
          center
          activeOpacity={0.8}
          onPress={navigateToRegister}
        />
      </ButtonWrappper>
    </Wrapper>
  );
};

LandingView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
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
