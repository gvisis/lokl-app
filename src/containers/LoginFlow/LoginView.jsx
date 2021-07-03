import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Header} from '../../components';
import auth from '@react-native-firebase/auth';

export const LoginView = ({userEmail}) => {
  const logOff = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View>
      <Header title="Logged in" />
      <Text>Hello {userEmail}!</Text>
      <Button title="Logoff" onPress={logOff} />
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    paddingVertical: 15,
  },
});
