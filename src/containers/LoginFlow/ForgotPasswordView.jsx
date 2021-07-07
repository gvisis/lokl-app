import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';

export const ForgotPasswordView = ({navigation}) => {
  return (
    <AuthContainer headerTitle="Password reset">
      <CustomInput placeholder="Enter your email" />
      <CustomBtn text="Reset" center activeOpacity={0.8} />
      <CustomBtn text="Go back" center width="30" backgroundColor="red" activeOpacity={0.8} onPress={() => navigation.goBack()}/>
    </AuthContainer>
  );
};
