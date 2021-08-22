import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

import { CompanyProduct } from '../../state/app/AppInterfaces';

interface ItemCardProps {
  item: CompanyProduct;
}

export const ItemCard: React.FC<ItemCardProps> = ({ onPress, item }) => (
  <ItemCardWrap onPress={onPress}>
    <ItemFooter>
      <ItemCardTitle>{item.title}</ItemCardTitle>
      <ItemPrice>{item.price}</ItemPrice>
    </ItemFooter>
  </ItemCardWrap>
);

const ItemCardWrap = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width / 2.5}px;
  height: ${Dimensions.get('window').height / 5}px;
  justify-content: flex-end;
  border-width: 1px;
  margin: 15px 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;
const ItemFooter = styled.View`
  flex-direction: row;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  justify-content: space-around;
  padding: 5px;
`;

const itemTitleStyle = css`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.white};
`;
const ItemCardTitle = styled.Text`
  ${itemTitleStyle}
`;
const ItemPrice = styled.Text`
  ${itemTitleStyle}
`;
