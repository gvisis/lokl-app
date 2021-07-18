import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { validator } from '../../utils/validators';

export const RegisterView = ({ navigation }) => {
  const { t } = useTranslation();
  const { message, error } = useSelector(state => state.ui.status);
  const dispatch = useDispatch();

  return (
    <AuthContainer headerTitle={t('register:title')}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validator.register}
        onSubmit={({ email, password }) =>
          dispatch(actions.user.register(email, password))
        }>
        {({
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <>
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <CustomInput
              placeholder={t('common:Enter email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
            <CustomInput
              placeholder={t('common:Enter pass')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text>{errors.confirmPassword}</Text>
            )}
            <CustomInput
              placeholder={t('common:Confirm pass')}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            <CustomBtn
              text={t('common:Create account')}
              center
              activeOpacity={0.8}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
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
