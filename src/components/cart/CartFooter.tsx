import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';

import { CustomBtn } from '..';
import { ROUTES } from '../../routes/RouteNames';

export const CartFooter = () => {
  const navigation = useNavigation();
  return (
    <CartFooterWrap>
      <TotalItems>Items: 2</TotalItems>
      <TotalPrice>Total price: $135</TotalPrice>
      <CustomBtn
        center
        secondary
        onPress={() => navigation.navigate(ROUTES.CartAddress)}
        label="Continue"
      />
    </CartFooterWrap>
  );
};

export default CartFooter;

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

const CartFooterWrap = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary1};
  justify-content: center;
  flex: 0.5;
  padding: 10px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
