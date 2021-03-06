import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';

import { useFunction } from '../../utils/hooks';
import { validator } from '../../utils/validators';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';

export const LoginView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const navigateToSignup = useFunction(navigate, ROUTES.Signup);
  const navigateToForgotPassword = useFunction(navigate, ROUTES.ForgotPassword);

  const handleLoginSubmit = useCallback(
    (email: string, password: string): void => {
      dispatch(actions.user.login(email, password));
    },
    [dispatch],
  );

  return (
    <AuthContainer headerTitle={t('login:title')}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validator.login}
        onSubmit={({ email, password }) => handleLoginSubmit(email, password)}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <>
            <CustomInput
              placeholder={t('common:email')}
              onChangeText={handleChange('email')}
              value={values.email}
              error={errors.email}
              iconName={'account'}
            />
            <CustomInput
              placeholder={t('login:password')}
              onChangeText={handleChange('password')}
              value={values.password}
              error={errors.password}
              iconName={'key-variant'}
              secureTextEntry
            />
            <StyledText onPress={navigateToForgotPassword}>
              {t('login:forgotPass')}
            </StyledText>
            <CustomBtn
              label={t('login:login')}
              center
              activeOpacity={0.8}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <LoginFooter>
        <StyledTextSecondary>{t('login:noAccount')}</StyledTextSecondary>
        <StyledText onPress={navigateToSignup}>{t('login:signup')}</StyledText>
      </LoginFooter>
    </AuthContainer>
  );
};

const LoginFooter = styled.View`
  position: absolute;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.lightGrey2};
  padding: 10px;
  margin-top: 10px;
  bottom: 0;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  text-decoration: underline;
  margin: 10px 20px;
  align-self: flex-start;
`;

const StyledTextSecondary = styled(StyledText)`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  margin: 10px 0;
`;
