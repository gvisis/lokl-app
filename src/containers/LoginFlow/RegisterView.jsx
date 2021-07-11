import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { actions } from '../../state/actions';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';

export const RegisterView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const { message, error } = useSelector(state => state.ui.status);
  const dispatch = useDispatch();

  const handleRegistration = async (userEmail, userPassword) => {
    if (userEmail === '' || userPassword === '') {
      dispatch(
        actions.ui.setStatus('error', true, t('errors:auth/fill-all-fields')),
      );
    } else {
      await auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          const userInfo = {
            email: auth().currentUser.email,
            id: auth().currentUser.uid,
            name: auth().currentUser.displayName,
          };
          //! Needs an in status message to be displayed
          dispatch(
            actions.ui.setStatus('success', true, 'Registration successful'),
          );
          dispatch(actions.user.setUserInfo(userInfo));
        })
        .catch(error => {
          dispatch(
            actions.ui.setStatus('error', true, t(`errors:${error.code}`)),
          );
        });
    }
  };

  return (
    <AuthContainer headerTitle={t('register:title')}>
      {error && <Text>{message}</Text>}
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
        secondary
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
