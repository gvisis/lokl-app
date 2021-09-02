import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';

import { CompanyProduct } from '../../state/app/AppInterfaces';
import { getFormatedPrice } from '../../utils/functions';

export const ItemHeader = ({
  item,
  productOwnerTitle,
  categoryTitle,
}: {
  item: CompanyProduct;
  productOwnerTitle: string;
  categoryTitle: string;
}) => (
  <ItemHeaderWrap>
    <TitleWrap>
      {item && <ProductImage source={{ uri: item.image }} />}
      {item && (
        <OwnerWrap>
          <OwnerTitle>{productOwnerTitle}</OwnerTitle>
          <CompanyLogo source={{ uri: item.image }} />
        </OwnerWrap>
      )}
    </TitleWrap>
    <BottomHeader>
      <ProductTitle>{item.title}</ProductTitle>
      <ProductCat>{categoryTitle}</ProductCat>
      <Price>{getFormatedPrice(item.price)}</Price>
    </BottomHeader>
  </ItemHeaderWrap>
);

const ItemHeaderWrap = styled.View`
  flex: 1.5;
`;

const ProductImage = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TitleWrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const OwnerWrap = styled.View`
  background: ${({ theme }) => theme.colors.tertiary85};
  margin: 10px;
  padding: 10px;
  flex: 0.9;
  border-radius: ${({ theme }) => theme.border.radius10}px;
`;

const OwnerTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;

const CompanyLogo = styled.Image`
  position: absolute;
  right: -30px;
  bottom: 0;
  height: 84px;
  width: 84px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.border.radius50}px;
`;
const BottomHeader = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey2};
  elevation: 1;
`;

const ProductTitle = styled.Text`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
const ProductCat = styled.Text`
  color: ${({ theme }) => theme.colors.secondary2};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  padding: 0 5px;
`;
const Price = styled.Text`
  margin-left: 5px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
