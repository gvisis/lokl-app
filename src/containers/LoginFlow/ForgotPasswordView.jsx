import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Text} from 'react-native';

import {AuthContainer} from '.';
import {CustomBtn, CustomInput} from '../../components';
import {actions} from '../../state/actions';
import {theme} from '../../assets/theme/default';

export const ForgotPasswordView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {colors} = theme;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.ui.status);

  const handlePasswordReset = async resetEmail => {
    if (resetEmail) {
      await auth()
        .sendPasswordResetEmail(resetEmail)
        .then(() => {
          dispatch(
            actions.ui.setStatus(
              `success`,
              true,
              `Password sent to ${resetEmail}`,
            ),
          );
        })
        .catch(error => {
          dispatch(actions.ui.setStatus('error', true, error.code));
        });
    } else {
      dispatch(actions.ui.setStatus('error', true, `Enter your email`));
    }
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
        width="30"
        backgroundColor={colors.secondaryBtn}
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
