import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginView = ({userEmail}) => {
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
      <Text>Laba Diena {userEmail}</Text>
      <Button title="Logoff" onPress={logOff} />
    </View>
  );
};

export default LoginView;
