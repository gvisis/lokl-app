import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

export const LandingPageView = () => {
  const landingPageBgImage = require('../../assets/images/landingPageImage.png');
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.landingCover}
        source={landingPageBgImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  landingCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});
