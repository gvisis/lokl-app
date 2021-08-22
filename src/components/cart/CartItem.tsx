import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';

import { getProductOwnerTitle } from '../../utils/functions';

export const CartItem: React.FC = ({ item }) => {
  const allCompanies = useSelector(state => state.app.allCompanies);
  const { title, price, image, amount } = item;
  return (
    <CartItemWrap>
      <CartItemLeft>
        <ItemImage resizeMode="contain" source={{ uri: image }} />
      </CartItemLeft>
      <CartItemMid>
        <ItemName>{title}</ItemName>
        <ItemSeller>{getProductOwnerTitle(allCompanies, item)}</ItemSeller>
        <ItemPrice>{price} €</ItemPrice>
      </CartItemMid>
      <CartItemRight>
        <TouchableOpacity onPress={() => 'decrease'}>
          <IncDecButton name="plus-circle" size={25} />
        </TouchableOpacity>
        <QuantityValue>{amount}</QuantityValue>
        <TouchableOpacity onPress={() => 'increase'}>
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
  margin: 5px;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`;
