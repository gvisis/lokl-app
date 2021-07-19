import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';

export const ForgotPasswordView = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validator.passwordReset}
        onSubmit={({ email }) => dispatch(actions.user.passwordReset(email))}>
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
              placeholder={t('common:Enter email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <CustomBtn
              text={t('common:Reset')}
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
        width={30}
        secondary
        activeOpacity={0.8}
        onPress={navigation.goBack}
      />
    </AuthContainer>
  );
};
