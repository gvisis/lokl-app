import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { validator } from '../../utils/validators';

export const RegisterView = ({ navigation }) => {
  const { t } = useTranslation();
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
            <CustomInput
              placeholder={t('common:Enter email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <CustomInput
              placeholder={t('common:Enter pass')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <CustomInput
              placeholder={t('common:Confirm pass')}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <CustomBtn
              label={t('common:Create account')}
              center
              activeOpacity={0.8}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <CustomBtn
        label={t('common:Go back')}
        center
        width="30"
        secondary
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
