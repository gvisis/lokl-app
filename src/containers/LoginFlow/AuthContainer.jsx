import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { InputContainer } from '../../components';
import { theme } from '../../assets/theme/default';

export const AuthContainer = ({ children, headerTitle }) => {
  const logoImg = require('../../assets/images/logoCat.png');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={logoImg}
              style={styles.logoImg}
              resizeMode="contain"
            />
            <Text style={styles.logoTxt}>{headerTitle}</Text>
          </View>
          <InputContainer>{children}</InputContainer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const {
  colors,
  fonts: { size },
} = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  imgContainer: {
    height: '35%',
    width: '100%',
  },
  logoImg: {
    height: '100%',
    width: '100%',
  },
  logoTxt: {
    bottom: 0,
    color: colors.white,
    fontSize: size.xxxl,
    letterSpacing: 1,
    position: 'absolute',
    right: 30,
    textTransform: 'uppercase',
  },
});
