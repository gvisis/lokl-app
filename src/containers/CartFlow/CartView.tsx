import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { CartFooter, CartItem, Container } from '../../components';
import { actions } from '../../state/actions';

export const CartView: React.FC = ({ navigation }) => {
  const { cart, quantity, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.cart.getCartTotals());
  }, [cart, dispatch]);

  const handleRenderCartItem = ({ item }) => <CartItem item={item} />;

  return (
    <Container>
      <CartHeader>
        <CartHeaderText>Products &gt; Address &gt; Payment</CartHeaderText>
      </CartHeader>
      <CartWrapTop>
        {/* Mock view of items */}
        {cart.length !== 0 && (
          <FlatList
            data={cart}
            renderItem={handleRenderCartItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </CartWrapTop>
      <CartFooter quantity={quantity} total={total} />
    </Container>
  );
};

const CartWrapTop = styled.View`
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
