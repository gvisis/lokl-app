import React, {useState} from 'react';

import {useGlobalContext} from '../../state/context';
import {Text} from 'react-native';
import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';

export const LoginView = ({navigation}) => {
  const {isLoggedIn} = useGlobalContext();
  console.warn(isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin, handleRegister, handleLogout} = useGlobalContext();
  return (
    <AuthContainer headerTitle="Login">
      <CustomInput placeholder="Email" onChangeText={setEmail} value={email} />
      <CustomInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <CustomBtn
        text="Login"
        center
        activeOpacity={0.8}
        onPress={() => handleLogin(email, password)}
      />
      <CustomBtn
        text="Forgotten password?"
        center
        activeOpacity={0.8}
        width="50"
        fontSize="20"
        textTransform="uppercase"
        onPress={() => navigation.navigate(ROUTES.ForgotPassword)}
      />
      <Text style={{color: 'white', marginTop: 5, lineHeight: 17}}>or</Text>
      <CustomBtn
        text="Create new account"
        center
        activeOpacity={0.8}
        width="50"
        fontSize="20"
        textTransform="uppercase"
        marginTop="5"
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
    </AuthContainer>
  );
};
