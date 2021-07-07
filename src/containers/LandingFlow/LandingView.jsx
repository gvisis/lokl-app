import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import {Header, CustomBtn} from '../../components';
import {ROUTES} from '../../routes/RouteNames';

const {width: windowWidth, height: windowHeight} = Dimensions.get('screen');
const landingPageBgImage = require('../../assets/images/landingPageImage.png');

export const LandingView = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Nyan Cat says hi!" height="5px" />
      <ImageBackground
        style={styles.landingCover}
        source={landingPageBgImage}
        resizeMethod="scale"
      />
      <View style={styles.buttonWrapper}>
        <CustomBtn
          text="Login to cat"
          center
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.Login)}
        />
        <CustomBtn
          text="Create new cat account"
          center
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.Register)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  landingCover: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
  },
  buttonWrapper: {
    position: 'absolute',
    top: windowHeight / 2 - 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
    color: 'red',
    marginTop: 20,
    width: windowWidth - 50,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
});