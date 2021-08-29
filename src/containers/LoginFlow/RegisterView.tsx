import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import styled from 'styled-components/native';

import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { AuthContainer } from '.';
import { CustomBtn, CustomInput } from '../../components';
import { useFunction } from '../../utils/hooks';
import { validator } from '../../utils/validators';
import { ComponentNavProps } from '../../types/general';

export const RegisterView: React.FC<ComponentNavProps<ROUTES.Signup>> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigateToLogin = useFunction(navigation.navigate, ROUTES.Login);
  return (
    <AuthContainer headerTitle={t('signup:title')}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
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
          <Wrapper>
            <CustomInput
              placeholder={t('common:enterEmail')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              iconName={'account'}
            />
            <CustomInput
              secureTextEntry
              placeholder={t('common:enterPass')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              iconName={'key-variant'}
            />
            <CustomInput
              secureTextEntry
              placeholder={t('common:confirmPass')}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              iconName={'key-variant'}
            />
            <CustomBtn
              label={t('common:createAcc')}
              center
              secondary
              activeOpacity={0.8}
              onPress={handleSubmit}
              width={50}
            />
            <StyledText onPress={navigateToLogin}>
              {t('common:alreadyAcc')}
            </StyledText>
          </Wrapper>
        )}
      </Formik>
    </AuthContainer>
  );
};

const StyledText = styled.Text`
  margin: 20px;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  text-decoration: underline;
`;

const Wrapper = styled.View`
  margin: 5% auto;
  align-items: center;
  justify-content: center;
`;
