import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {StyleSheet, Text} from 'react-native';
import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';

export const ForgotPasswordView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const handleResetPassword = usersEmail => {
    auth()
      .sendPasswordResetEmail(usersEmail)
      .then(() => {
        console.warn(`Password reset email sent to ${usersEmail}`);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
    setEmail('');
  };
  return (
    <AuthContainer headerTitle="Password reset">
      <CustomInput
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
      />
      <CustomBtn
        text="Reset"
        center
        activeOpacity={0.8}
        onPress={() => handleResetPassword(email)}
      />
      <CustomBtn
        text="Go back"
        center
        width="30"
        backgroundColor="red"
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      />
    </AuthContainer>
  );
};
