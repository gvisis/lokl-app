import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContainer, Container } from '.';
import { PassResetForm } from '../../components';

export const ForgotPasswordView: React.FC<Container> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <PassResetForm navigation={navigation} />
    </AuthContainer>
  );
};
