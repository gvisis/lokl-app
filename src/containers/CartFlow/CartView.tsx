import React from 'react';
import styled from 'styled-components/native';

import { CartFooter, CartItem, Container } from '../../components';

export const CartView: React.FC = ({ navigation }) => (
  <Container>
    <CartHeader>
      <CartHeaderText>Products &gt; Address &gt; Payment</CartHeaderText>
    </CartHeader>
    <CartWrapTop showsVerticalScrollIndicator={false}>
      {/* Mock view of items */}
      {new Array(6).fill(<CartItem />).map(item => item)}
    </CartWrapTop>
    <CartFooter />
  </Container>
);

const CartWrapTop = styled.ScrollView`
  flex: 3;
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
