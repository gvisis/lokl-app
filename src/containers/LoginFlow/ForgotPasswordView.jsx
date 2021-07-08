import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';

import {AuthContainer} from './';
import {CustomBtn, CustomInput} from '../../components';
import {theme} from '../../assets/theme/default'
export const ForgotPasswordView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {colors} = theme;
  const {t} = useTranslation();
  const handleResetPassword = usersEmail => {
    auth()
      .sendPasswordResetEmail(usersEmail)
      .then(() => {
        console.warn(`Password reset email sent to ${usersEmail}`);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
    setEmail('');
  };
  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <CustomInput
        placeholder={t('common:Enter email')}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <CustomBtn
        text={t('common:Reset')}
        center
        activeOpacity={0.8}
        onPress={() => handleResetPassword(email)}
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
