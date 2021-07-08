import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {InputContainer} from '../../components';
import {theme} from '../../assets/theme/default';

export const AuthContainer = ({children, headerTitle}) => {
  const logoImg = require('../../assets/images/logoCat.png');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
          <Text style={styles.logoTxt}>{headerTitle}</Text>
          <InputContainer>{children}</InputContainer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const {
  colors,
  fonts: {size},
} = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoImg: {
    width: '100%',
    height: '40%',
  },
  logoTxt: {
    color: colors.white,
    textTransform: 'uppercase',
    position: 'absolute',
    top: '30%',
    right: 30,
    fontSize: size.xxxl,
    letterSpacing: 1,
  },
});
