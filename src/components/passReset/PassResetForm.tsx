import React, { useCallback } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Feather';

import { CustomBtn, CustomInput } from '..';
import { actions } from '../../state/actions';
import { RootState } from '../../state/reducers';
import { validator } from '../../utils/validators';

const ResetSuccessBox = styled.View`
  width: 90%;
  height: 150px;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.secondaryBtn};
  justify-content: space-evenly;
  padding: 10px;
`;

const BoxMessage = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  text-align: center;
`;
const ContainerWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const PassResetForm: React.FC = ({ navigation }) => {
  const theme = React.useContext(ThemeContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { onSync, passResetStatus } = useSelector(
    (state: RootState) => state.ui,
  );

  const handlePassResetBack = useCallback((): void => {
    dispatch(actions.ui.clearPassResetStatus());
    navigation.goBack();
  }, []);

  const handlePassReset = useCallback((email: string): void => {
    dispatch(actions.user.passwordReset(email));
  }, []);

  return (
    <ContainerWrapper>
      {passResetStatus ? (
        <ResetSuccessBox>
          <Icon
            name="check-circle"
            size={40}
            color={theme.colors.secondaryBtn}
          />
          <BoxMessage>{t('common:Password sent')}</BoxMessage>
        </ResetSuccessBox>
      ) : (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validator.passwordReset}
          onSubmit={({ email }) => handlePassReset(email)}>
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
                label={t('common:Reset')}
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
        label={t('common:Go back')}
        center
        width={30}
        secondary
        activeOpacity={0.8}
        onPress={handlePassResetBack}
      />
    </ContainerWrapper>
  );
};
