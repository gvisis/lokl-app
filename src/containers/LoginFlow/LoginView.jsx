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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
          <Text style={{color: 'red'}}>Labas</Text>
          <InputContainer>
            <CustomInput placeholder="Email" />
            <CustomInput placeholder="Password" />
          </InputContainer>
          <CustomBtn text="Login" center activeOpacity={0.8} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003466',
  },
  logoImg: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default styles;
