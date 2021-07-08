import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Text} from 'react-native';

import {AuthContainer} from './';
import {useGlobalContext} from '../../state/context';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';
import {theme} from '../../assets/theme/default';

export const LoginView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin} = useGlobalContext();
  const {colors, fonts: {size}} = theme;
  const {t} = useTranslation();

  return (
    <AuthContainer headerTitle={t('login:title')}>
      <CustomInput placeholder={t('common:Email')} onChangeText={setEmail} value={email} />
      <CustomInput
        placeholder={t('common:Password')} 
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <CustomBtn
        text={t('common:Login')} 
        center
        activeOpacity={0.8}
        onPress={() => handleLogin(email, password)}
      />
      <CustomBtn
        text={t('common:Forgot password')} 
        center
        activeOpacity={0.8}
        width="50"
        fontSize={size.xxl}
        textTransform="uppercase"
        onPress={() => navigation.navigate(ROUTES.ForgotPassword)}
      />
      <Text style={{color: colors.white, marginTop: 5, lineHeight: 17}}>{t('common:Or')} </Text>
      <CustomBtn
        text={t('common:Create new')} 
        center
        activeOpacity={0.8}
        width="50"
        fontSize={size.xxl}
        textTransform="uppercase"
        marginTop="5"
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
    </AuthContainer>
  );
};
