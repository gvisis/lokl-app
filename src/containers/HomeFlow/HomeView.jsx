import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, CustomBtn} from '../../components';
import {useGlobalContext} from '../../state/context';

export const HomeView = ({navigation}) => {
  const {userEmail,handleLogOut} = useGlobalContext();

  return (
    <View style={styles.container}>
      <Header title="Welcome Home!" />
      <Text style={styles.textStyle}>Your email: {userEmail}!</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <CustomBtn
        text="LogOut"
        style={styles.logOutButton}
        onPress={handleLogOut}
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
