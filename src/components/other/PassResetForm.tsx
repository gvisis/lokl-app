import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';

import { CustomBtn, CustomInput } from '..';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';

export const PassResetForm: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { t } = useTranslation();
  const { onSync, passResetStatus } = useSelector(state => state.ui);

  const handlePassResetBack = useCallback((): void => {
    dispatch(actions.ui.clearPassResetStatus());
    goBack();
  }, []);

  const handlePassReset = useCallback((email: string): void => {
    dispatch(actions.user.passwordReset(email));
  }, []);

  return (
    <ContainerWrapper>
      {passResetStatus ? (
        <ResetSuccessBox>
          <Icon name="check-circle" size={40} color={theme.colors.tertiary1} />
          <BoxMessage>{t('common:passSent')}</BoxMessage>
        </ResetSuccessBox>
      ) : (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validator.passwordReset}
          onSubmit={({ email }) => handlePassReset(email)}
        >
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
                placeholder={t('common:enterEmail')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                iconName={'email'}
              />
              <CustomBtn
                label={t('common:reset')}
                center
                onSync={onSync.button}
                activeOpacity={0.8}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      )}
      <CustomBtn
        label={t('common:goBack')}
        center
        width={30}
        secondary
        activeOpacity={0.8}
        onPress={handlePassResetBack}
      />
    </ContainerWrapper>
  );
};

const ResetSuccessBox = styled.View`
  width: 90%;
  height: 150px;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  justify-content: space-evenly;
  padding: 10px;
  margin-top: 10px;
`;

const BoxMessage = styled.Text`
  color: ${({ theme }) => theme.colors.tertiary1};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  text-align: center;
`;
const ContainerWrapper = styled.View`
  width: 100%;
  align-items: center;
`;
