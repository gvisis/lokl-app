import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { CartAddressView, CartItemsView } from '.';
import { CartFooter, Container } from '../../components';
import { ROUTES } from '../../routes/RouteNames';

export const CartView: React.FC = () => {
  const { quantity, total } = useSelector(state => state.cart);
  return (
    <Container>
      <CartHeader>
        <CartHeaderText>Cart &gt; Address &gt; Payment</CartHeaderText>
      </CartHeader>
      <CartItemsView />
      {/* <CartAddressView /> */}
      <CartFooter quantity={quantity} total={total} />
    </Container>
  );
};
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
