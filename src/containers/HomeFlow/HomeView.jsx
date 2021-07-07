import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, CustomBtn} from '../../components';
import {useGlobalContext} from '../../state/context';

export const HomeView = ({navigation, route}) => {
  const {handleLogout, getUserEmail} = useGlobalContext();

  // console.warn(getUserEmail(), 'homeview'); // render loops
  
  return (
    <View style={styles.container}>
      <Header title="Welcome Home!" />
      <Text style={styles.textStyle}>Your email:  !</Text>
      <CustomBtn
        text="LogOut"
        style={styles.logOutButton}
        onPress={handleLogout}
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
