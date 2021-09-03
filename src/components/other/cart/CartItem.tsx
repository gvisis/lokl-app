import React, { SetStateAction, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Value } from 'react-native-reanimated';

import { actions } from '../../../state/actions';
import { CompanyProduct } from '../../../state/app/AppInterfaces';
import {
  getFormatedPrice,
  getProductOwnerTitle,
} from '../../../utils/functions';
import { useFunction } from '../../../utils/hooks';
import { CART_ACTION } from '../../../utils/variables';

interface CartItem {
  item: CompanyProduct;
  shouldRemove: Value<number>;
}

export const CartItem: React.FC<CartItem> = ({ item, shouldRemove }) => {
  const allCompanies = useSelector(state => state.app.allCompanies);
  const dispatch = useDispatch();
  const { title, price, image, amount } = item;

  const handleIncreaseAmount = useFunction(
    dispatch,
    actions.cart.checkCartActions(CART_ACTION.ADD, item),
  );

  const handleDecreaseAmount = useCallback(() => {
    item.amount === 1
      ? shouldRemove.setValue(1)
      : dispatch(actions.cart.checkCartActions(CART_ACTION.REMOVE, item));
  }, [item]);

  return (
    <CartItemWrap>
      <CartItemLeft>
        <ItemImage resizeMode="contain" source={{ uri: image }} />
      </CartItemLeft>
      <CartItemMid>
        <ItemName>{title}</ItemName>
        <ItemSeller>{getProductOwnerTitle(allCompanies, item)}</ItemSeller>
        <ItemPrice>{getFormatedPrice(parseFloat(price))}</ItemPrice>
      </CartItemMid>
      <CartItemRight>
        <TouchableOpacity onPress={handleIncreaseAmount}>
          <IncDecButton name="plus-circle" size={25} />
        </TouchableOpacity>
        <QuantityValue>{amount}</QuantityValue>
        <TouchableOpacity onPress={handleDecreaseAmount}>
          <IncDecButton name="minus-circle" size={25} />
        </TouchableOpacity>
      </CartItemRight>
    </CartItemWrap>
  );
};
const centerItems = css`
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const CartItemWrap = styled.View`
  flex-direction: row;
  height: 120px;
  margin-bottom: 5px;
  padding: 0 5px;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.primary};
  border-bottom-width: 1px;
`;

const CartItemLeft = styled.TouchableOpacity`
  flex: 0.5;
  ${centerItems}
`;

const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CartItemMid = styled.View`
  flex: 2;
  ${centerItems}
  align-items: flex-start;
`;

const ItemName = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
`;
const ItemSeller = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  margin-bottom: 10px;
`;
const ItemPrice = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  color: ${({ theme }) => theme.colors.secondary1};
  margin-bottom: 5px;
`;

const CartItemRight = styled.View`
  flex: 0.3;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  color: ${({ theme }) => theme.colors.black};
  ${centerItems}
`;

const IncDecButton = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
`;
const QuantityValue = styled.Text`
  margin: 5px 0;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`;
