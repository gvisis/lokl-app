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
import {CustomBtn, CustomInput, Header, InputContainer} from '../../components';

import {ROUTES} from '../../routes/RouteNames';

export const LoginView = ({navigation}) => {
  const logoImg = require('../../assets/images/logoCat.png');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
          <Text
            style={{color: 'red', position: 'absolute', top: '30%', right: 30}}>
            NYAN CAT LOGIN
          </Text>
          <InputContainer>
            <CustomInput placeholder="Email" />
            <CustomInput placeholder="Password" />
          </InputContainer>
          <CustomBtn text="Login" center activeOpacity={0.8} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003466',
  },
  logoImg: {
    width: '100%',
    height: '40%',
  },
});

export default styles;
