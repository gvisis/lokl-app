import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CartItemLayout, EmptyView } from '../../components';
import { CompanyProduct } from '../../state/app/AppInterfaces';

interface RenderCartItem {
  item: CompanyProduct;
}

export const CartItemsView: React.FC = () => {
  const { cart } = useSelector(state => state.cart);
  const { t } = useTranslation();

  const handleRenderCartItem = ({ item }: RenderCartItem) => (
    <CartItemLayout item={item} />
  );

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
  background-color: ${({ theme }) => theme.colors.background};
`;
