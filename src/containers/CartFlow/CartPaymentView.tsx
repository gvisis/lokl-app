import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CartItemLayout, EmptyView } from '../../components';
import { actions } from '../../state/actions';

export const CartPaymentView: React.FC = () => {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRenderCartItem = ({ item }) => <CartItemLayout item={item} />;

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
        <EmptyView text={t('cart:empty')} />
      )}
    </CartWrapTop>
  );
};
const CartWrapTop = styled.View`
  flex: 1;
`;
