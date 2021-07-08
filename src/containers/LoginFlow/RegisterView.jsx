import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {AuthContainer} from './';
import {useGlobalContext} from '../../state/context';
import {CustomBtn, CustomInput} from '../../components';
import {theme} from '../../assets/theme/default';

export const RegisterView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleRegistration} = useGlobalContext();
  const {t} = useTranslation();

  const {colors} = theme;
  return (
    <AuthContainer headerTitle={t('register:title')}>
      <CustomInput
        placeholder={t('common:Enter email')} 
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <CustomInput
        placeholder={t('common:Enter pass')} 
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <CustomBtn
        text={t('common:Create account')} 
        center
        activeOpacity={0.8}
        onPress={() => handleRegistration(email, password)}
      />
      <CustomBtn
        text={t('common:Go back')} 
        center
        width="30"
        backgroundColor={colors.secondaryBtn}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      />
    </AuthContainer>
  );
};
