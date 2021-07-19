import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContainer } from '.';
import { PassResetForm } from '../../components';

export const ForgotPasswordView = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <PassResetForm navigation={navigation} />
    </AuthContainer>
  );
};
