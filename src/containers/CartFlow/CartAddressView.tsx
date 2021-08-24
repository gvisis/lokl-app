//! Cart address ui

import React, { useState } from 'react';
import styled from 'styled-components/native';

import { CartAddressModal } from '.';
import { CustomBtn } from '../../components';

export const CartAddressView: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CartWrapTop>
      {modalVisible && (
        <CartAddressModal
          setModalVisible={setModalVisible}
          isVisible={modalVisible}
        />
      )}
      <CustomBtn
        fontSize={15}
        onPress={() => setModalVisible(!modalVisible)}
        label="Select shipping address"
        center
      />
      <CustomBtn secondary fontSize={15} label="Add new address" center />
    </CartWrapTop>
  );
};
const CartWrapTop = styled.View`
  flex: 1;
  padding: 0 10px;
`;
