import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import { AuthContainer, Container } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { validator } from '../../utils/validators';

export const RegisterView: React.FC<Container> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <AuthContainer headerTitle={t('signup:title')}>
      <Formik
        initialValues={{
          email: 'email@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        }}
        validationSchema={validator.signup}
        onSubmit={({ email, password }) =>
          dispatch(actions.user.signup(email, password))
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
        width={30}
        secondary
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
