import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';

export const LoginView = ({navigation}) => {
  return (
    <AuthContainer headerTitle="Login">
      <CustomInput placeholder="Email" />
      <CustomInput placeholder="Password" />
      <CustomBtn text="Login" center activeOpacity={0.8} />
      <CustomBtn
        text="Forgotten password?"
        center
        activeOpacity={0.8}
        width='50'
        fontSize="20"
        textTransform="uppercase"
        onPress={() => navigation.navigate(ROUTES.ForgotPassword)}

      />
      <Text style={{color: 'white', marginTop: 5, lineHeight: 17}}>or</Text>
      <CustomBtn
        text="Create new account"
        center
        activeOpacity={0.8}
        width="50"
        fontSize="20"
        textTransform="uppercase"
        marginTop="5"
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
    </AuthContainer>
  );
};
