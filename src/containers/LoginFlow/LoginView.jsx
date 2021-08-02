import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import styled from 'styled-components/native';

import { useFunction } from '../../utils/hooks';
import { validator } from '../../utils/validators';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';

export const LoginView = ({ navigation }) => {
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
        initialValues={{ email: 'email@example.com', password: 'password123' }}
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
              label={t('common:Login')}
              center
              activeOpacity={0.8}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <SecondaryContainer>
        <StyledText onPress={navigateToRegister}>
          {t('common:Create account')}
        </StyledText>
        <StyledText onPress={navigateToForgotPassword}>
          {t('common:Forgot password')}
        </StyledText>
      </SecondaryContainer>
    </AuthContainer>
  );
};

const SecondaryContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.primary60};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-top: 25px;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  text-decoration: underline;
`;
