//! Cart address ui

import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CartItemLayout, EmptyView } from '../../components';
import { actions } from '../../state/actions';

export const CartItemsView: React.FC = () => {
  const { cart } = useSelector(state => state.cart);
  const handleRenderCartItem = ({ item }) => <CartItemLayout item={item} />;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.cart.getCartTotals());
  }, [cart, dispatch]);

  return (
    <CartWrapTop>
      {cart.length !== 0 ? (
        <FlatList
          data={cart}
          renderItem={handleRenderCartItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyView text="Your cart is empty" />
      )}
    </CartWrapTop>
  );
};
const CartWrapTop = styled.View`
  flex: 1;
`;
