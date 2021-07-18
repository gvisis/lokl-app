import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { Formik } from 'formik';

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
  const { message, error } = useSelector(state => state.ui.status);
  const dispatch = useDispatch();

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
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <CustomInput
              placeholder={t('common:Email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              border={errors.email && '1px solid red'}
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
            <CustomInput
              placeholder={t('common:Password')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              border={errors.password && '1px solid red'}
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
        onPress={() => navigation.navigate(ROUTES.ForgotPassword)}
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
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
    </AuthContainer>
  );
};
