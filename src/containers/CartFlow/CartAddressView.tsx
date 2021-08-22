//! Cart address ui

import React, { useState } from 'react';
import styled from 'styled-components/native';

import { CartAddressModal } from './CartAddressModal';
import { Container, CustomBtn } from '../../components';

export const CartAddressView: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container>
      {modalVisible && (
        <CartAddressModal
          setModalVisible={setModalVisible}
          isVisible={modalVisible}
        />
      )}
      <CartHeader>
        <CartHeaderText>Products &gt; Address &gt; Payment</CartHeaderText>
      </CartHeader>
      <CartWrapTop>
        <CustomBtn
          fontSize={15}
          onPress={() => setModalVisible(!modalVisible)}
          label="Select shipping address"
          center
        />
        <CustomBtn secondary fontSize={15} label="Add new address" center />
      </CartWrapTop>
      <CartFooter>
        <TotalItems>Items: 2</TotalItems>
        <TotalPrice>Total price: $135</TotalPrice>
        <CustomBtn
          center
          secondary
          onPress={() => console.warn('Button pressed')}
          label="Continue"
        />
      </CartFooter>
    </Container>
  );
};
const CartWrapTop = styled.View`
  flex: 3;
  align-items: flex-start;
  padding: 0 10px;
`;

const CartHeader = styled.View`
  background: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.secondary1};
  margin-bottom: 5px;
`;

const CartHeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
`;

const TotalPrice = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;
const TotalItems = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;

const CartFooter = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary1};
  justify-content: center;
  flex: 0.5;
  padding: 10px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
