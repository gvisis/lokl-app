import React from 'react';
import {Text} from 'react-native';
import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';

export const RegisterView = ({navigation}) => {
  return (
    <AuthContainer headerTitle="Register" buttonText="Create account">
      <CustomInput placeholder="Enter your email" />
      <CustomInput placeholder="Enter your new password" />
      <CustomBtn text="Create account" center activeOpacity={0.8} />
      <CustomBtn text="Go back" center width="30" backgroundColor="red" activeOpacity={0.8} onPress={() => navigation.goBack()}/>
    </AuthContainer>
  );
};