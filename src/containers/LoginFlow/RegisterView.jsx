import React from 'react';
import {View, Text, Button} from 'react-native';

import {Header} from '../../components';
import {useGlobalContext} from '../../state/context';

export const RegisterView = ({navigation}) => {
  return (
    <View>
      <Header title="Register View" />
    </View>
  );
};
