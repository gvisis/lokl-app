import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { AddNewAddress, AddressSelect, Container } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { ComponentNavProps } from '../../types/general';

export const AddressView: React.FC<ComponentNavProps<ROUTES.Address>> = () => {
  const { address } = useSelector(state => state.user.userInfo);
  const { t } = useTranslation();

  return (
    <Container>
      <AddressesWrap
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        {address &&
          address.map(addressData => (
            <AddressSelect key={addressData.id} address={addressData} />
          ))}
        <AddNewAddress text={t('common:addNewAddress')} />
      </AddressesWrap>
    </Container>
  );
};

const AddressesWrap = styled.ScrollView.attrs({ flex: 1 })`
  padding: 0 10px;
`;
