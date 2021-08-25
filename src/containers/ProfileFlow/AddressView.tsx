import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { AddNewAddress, AddressSelect, Container } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { ComponentNavProps } from '../../types/general';

export const AddressView: React.FC<ComponentNavProps<ROUTES.Address>> = () => {
  const { address } = useSelector(state => state.user.userInfo);

  return (
    <Container>
      <AddressesWrap
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        {address &&
          address.map(addressData => (
            <AddressSelect key={addressData.id} address={addressData} />
          ))}
        <AddNewAddress text={'Add new address'} />
      </AddressesWrap>
    </Container>
  );
};

const AddressesWrap = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;
