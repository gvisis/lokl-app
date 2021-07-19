import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CustomBtn, Header } from '../../components';
import { ROUTES } from '../../routes/RouteNames';

const { width: windowWidth, height: windowHeight } = Dimensions.get('screen');

export const LandingView = ({ navigation }) => {
  const landingPageBgImage = require('../../assets/images/landingPageImage.png');
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Header title={t('landing:appName')} height="5px" />
      <ImageBackground
        style={styles.landingCover}
        source={landingPageBgImage}
        resizeMethod="scale"
      />
      <View style={styles.buttonWrapper}>
        <CustomBtn
          text={t('common:Login to')}
          center
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.Login)}
        />
        <CustomBtn
          text={t('common:Create account')}
          center
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.Register)}
        />
      </View>
    </View>
  );
};

LandingView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: windowHeight / 2 - 100,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  landingCover: {
    height: windowHeight,
    position: 'absolute',
    resizeMode: 'contain',
    width: windowWidth,
    zIndex: -1,
  },
});
