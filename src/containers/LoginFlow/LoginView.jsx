import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Header} from '../../components';
import auth from '@react-native-firebase/auth';

export const LoginView = () => {
  return (
    <View>
      <Header title="Login" />
    </View>
  );
};
