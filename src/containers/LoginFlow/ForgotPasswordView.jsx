import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';

import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { actions } from '../../state/actions';

export const ForgotPasswordView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.ui.status);

  const handlePasswordReset = resetEmail => {
    dispatch(actions.user.passwordReset(resetEmail));
  };

  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <Text>{message}</Text>
      <CustomInput
        placeholder={t('common:Enter email')}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <CustomBtn
        text={t('common:Reset')}
        center
        activeOpacity={0.8}
        onPress={() => handlePasswordReset(email)}
      />
      <CustomBtn
        text={t('common:Go back')}
        center
        width={30}
        secondary
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
