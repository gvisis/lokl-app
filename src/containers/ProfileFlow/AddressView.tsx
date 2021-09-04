import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { AddNewAddress, AddressSelect, Container } from '../../components';

export const AddressView: React.FC = () => {
  const { address } = useSelector(state => state.user.userInfo);
  const [selectedId, setSelectedId] = useState(null);

  const { t } = useTranslation();

  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
  };

  return (
    <Container>
      <AddressesWrap
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {address &&
          address.map(addressData => (
            <AddressSelect
              selectedId={selectedId}
              onPress={() => handleSelectAddress(addressData.id)}
              key={addressData.id}
              address={addressData}
            />
          ))}
        <AddNewAddress text={t('common:addNewAddress')} />
      </AddressesWrap>
    </Container>
  );
};

const AddressesWrap = styled.ScrollView.attrs({ flex: 1 })`
  padding: 0 10px;
`;
