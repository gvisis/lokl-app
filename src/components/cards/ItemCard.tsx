import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

import { ItemCardProps } from '../../types/general';
import { getFormatedPrice, getImagesFromObject } from '../../utils/functions';
import { useFunction } from '../../utils/hooks';

export const ItemCard: React.FC<ItemCardProps> = ({
  onPress,
  productOwnerTitle,
  item,
  isAdsItem,
}) => {
  const adImage = item.images && getImagesFromObject(item)[0].url;
  const productImage = item.image;
  const { navigate } = useNavigation();

  const handlePress = useFunction(navigate, onPress, {
    item,
    productOwnerTitle,
  });
  return (
    <ItemCardWrap onPress={handlePress} isAdsItem={isAdsItem}>
      {(productImage || adImage) && (
        <ImageBackgrounds source={{ uri: productImage || adImage }} />
      )}
      <ItemFooter>
        <ItemCardTitle numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </ItemCardTitle>
        <ItemPrice>{getFormatedPrice(item.price)}</ItemPrice>
      </ItemFooter>
    </ItemCardWrap>
  );
};

const ItemCardWrap = styled.TouchableOpacity<{ isAdsItem: boolean }>`
  width: ${({ isAdsItem }) => (isAdsItem ? 45 : 80)}%;
  height: ${Dimensions.get('window').height / 5}px;
  justify-content: flex-end;
  margin: 15px 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.border.radius5}px;
  overflow: hidden;
  elevation: 1;
`;

const ImageBackgrounds = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ItemFooter = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.secondary};
  justify-content: space-between;
  padding: 5px;
`;

const itemTitleStyle = css`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.white};
`;
const ItemCardTitle = styled.Text`
  ${itemTitleStyle}
  width: 70%;
`;
const ItemPrice = styled.Text`
  ${itemTitleStyle}
  align-self: center;
  text-align: right;
  font-size: ${({ theme }) => theme.fonts.size.s}px;
`;
