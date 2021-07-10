import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

import {AuthContainer} from '.';
import {CustomBtn, CustomInput} from '../../components';
import {ROUTES} from '../../routes/RouteNames';
import {actions} from '../../state/actions';
import {theme} from '../../assets/theme/default';

export const LoginView = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    colors,
    fonts: {size},
  } = theme;
  const {t} = useTranslation();
  const {errorMessage, error} = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const handleLogin = async (userEmail, userPassword) => {
    if (userEmail === '' || userPassword === '') {
      dispatch(actions.ui.setError('Fill all fields'));
    } else {
      await auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          const userInfo = {
            email: auth().currentUser.email,
            id: auth().currentUser.uid,
            name: auth().currentUser.displayName,
          };
          dispatch(actions.user.setUserInfo(userInfo));
        })
        .catch(error => {
          dispatch(actions.ui.setError(error.code));
        });
    }
  };

  return (
    <AuthContainer headerTitle={t('login:title')}>
      {error && <Text style={{color: 'white'}}>{errorMessage}</Text>}
      <CustomInput
        placeholder={t('common:Email')}
        onChangeText={setEmail}
        value={email}
      />
      <CustomInput
        placeholder={t('common:Password')}
        onChangeText={setPassword}
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
      {/*<Text style={{color: colors.white, marginTop: 5, lineHeight: 17}}>
        {t('common:Or')}{' '}
      </Text>
      <CustomBtn
        text={t('common:Create new')}
        center
        activeOpacity={0.8}
        width="50"
        fontSize={size.xxl}
        textTransform="uppercase"
        marginTop="5"
        onPress={() => navigation.navigate(ROUTES.Register)}
      /> */}
    </AuthContainer>
  );
};
