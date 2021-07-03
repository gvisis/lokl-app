import React from 'react';
import {View, Text, Button} from 'react-native';

import {Header} from '../../components';
import {useGlobalContext} from '../../state/context';

export const RegisterView = ({route, navigation}) => {
  const {name} = route.params;
  const {logToConsole, changeLogged} = useGlobalContext();
  return (
    <View>
      <Header title="Register View" />
      <Text>{name}</Text>
      <Button title="console" onPress={() => logToConsole()} />
      <Button title="changeLoggedIn" onPress={() => changeLogged()} />
    </View>
  );
};
