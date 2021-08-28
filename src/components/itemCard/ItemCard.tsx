import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { GestureResponderEvent } from 'react-native-modal';
import styled, { css } from 'styled-components/native';

import { AdsProps, CompanyProduct } from '../../state/app/AppInterfaces';

interface ItemCardProps {
  item: AdsProps | CompanyProduct;
  ads?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ onPress, item, ads }) => {
  const adImage = item.images && Object.values(item.images)[0];
  const productImage = item.image;
  return (
    <ItemCardWrap onPress={onPress} ads={ads}>
      {(productImage || adImage) && (
        <ImageBackgrounds source={{ uri: productImage || adImage }} />
      )}
      <ItemFooter>
        <ItemCardTitle>{item.title}</ItemCardTitle>
        <ItemPrice>{item.price}</ItemPrice>
      </ItemFooter>
    </ItemCardWrap>
  );
};

const ItemCardWrap = styled.TouchableOpacity`
  width: ${({ ads }) => (ads ? 45 : 80)}%;
  height: ${Dimensions.get('window').height / 5}px;
  justify-content: flex-end;
  margin: 15px 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.border.radius5}px;
  overflow: hidden;
  elevation: 3;
`;
const ImageBackgrounds = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
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
