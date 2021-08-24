import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContainer } from '.';
import { PassResetForm } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { ComponentNavProps } from '../../types/general';

export const ForgotPasswordView: React.FC<
  ComponentNavProps<ROUTES.ForgotPassword>
> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AuthContainer headerTitle={t('common:Password reset')}>
      <PassResetForm navigation={navigation} />
    </AuthContainer>
  );
};
