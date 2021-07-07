import React, {useState} from 'react';
import {AuthContainer} from './';
import {useGlobalContext} from '../../state/context';
import {CustomBtn, CustomInput} from '../../components';

export const RegisterView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleRegistration} = useGlobalContext();
  
  return (
    <AuthContainer headerTitle="Register" buttonText="Create account">
      <CustomInput
        placeholder="Enter your email"
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <CustomInput
        placeholder="Enter your new password"
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <CustomBtn
        text="Create account"
        center
        activeOpacity={0.8}
        onPress={() => handleRegistration(email, password)}
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
