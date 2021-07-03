import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, CustomBtn} from '../../components';
import auth from '@react-native-firebase/auth';

export const HomeView = ({userEmail, navigation}) => {
  const logOut = () => {
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
    <View style={styles.container}>
      <Header title="Welcome Home!" />
      <Text style={styles.textStyle}>Your email: {userEmail}!</Text>
      <Button
        title="Register"
        onPress={() =>
          navigation.navigate('Register', {
            name: 'Gvidas',
          })
        }
      />
      <CustomBtn
        text="LogOut"
        style={styles.logOutButton}
        onPress={logOut}
        activeOpacity={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutButton: {
    position: 'absolute',
    bottom: 15,
    marginLeft: 'auto',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
});
