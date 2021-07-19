import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { Formik } from 'formik';

import { useFunction } from '../../utils/hooks';
import { validator } from '../../utils/validators';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { theme } from '../../assets/theme/default';

export const LoginView = ({ navigation }) => {
  const {
    colors,
    fonts: { size },
  } = theme;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigateToRegister = useFunction(navigation.navigate, ROUTES.Register);
  const navigateToForgotPassword = useFunction(
    navigation.navigate,
    ROUTES.ForgotPassword,
  );

  return (
    <AuthContainer headerTitle={t('login:title')}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validator.login}
        onSubmit={({ email, password }) =>
          dispatch(actions.user.login(email, password))
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          touched,
        }) => (
          <>
            <CustomInput
              placeholder={t('common:Email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <CustomInput
              placeholder={t('common:Password')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
            />
            <CustomBtn
              text={t('common:Login')}
              center
              activeOpacity={0.8}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <CustomBtn
        text={t('common:Forgot password')}
        center
        activeOpacity={0.8}
        width="50"
        fontSize={size.xxl}
        textTransform="uppercase"
        onPress={navigateToForgotPassword}
      />
      <Text style={{ color: colors.white, marginTop: 5, lineHeight: 17 }}>
        {t('common:Or')}{' '}
      </Text>
      <CustomBtn
        text={t('common:Create account')}
        center
        activeOpacity={0.8}
        width="50"
        fontSize={size.xxl}
        textTransform="uppercase"
        marginTop="5"
        onPress={navigateToRegister}
      />
    </AuthContainer>
  );
};
