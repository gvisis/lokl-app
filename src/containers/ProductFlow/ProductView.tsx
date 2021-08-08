import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from 'src/routes/RouteNames';
import { RootStackParamList } from 'src/routes/RootStackParamList';
import BottomSheet from '@gorhom/bottom-sheet';

import { Container } from '../../components';

type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleProduct>;
  route: RouteProp<RootStackParamList, ROUTES.SingleProduct>;
};

export const ProductView: React.FC<ProductScreenProps> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const { product } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: product.title });
  }, [product]);

  return (
    <Container>
      <ItemHeader>
        <TitleWrap>
          <ProductImage source={{ uri: product.image }} />
          <OwnerWrap>
            <OwnerTitle>{product.owner}</OwnerTitle>
            <CompanyLogo source={{ uri: product.image }} />
          </OwnerWrap>
        </TitleWrap>
        <BottomHeader>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductCat>{product.category}</ProductCat>
          <Price>£ {product.price}</Price>
        </BottomHeader>
      </ItemHeader>
      <ItemMidSection>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
          <ItemDescription>{product.description}</ItemDescription>
        </ScrollView>
      </ItemMidSection>
      <ItemFooter>
        <ItemRating>{product.rating}</ItemRating>
        <AddWrap>
          <AddButton>Add to cart</AddButton>
        </AddWrap>
      </ItemFooter>
    </Container>
  );
};

const ItemHeader = styled.View`
  flex: 1.5;
  width: 100%;
  height: 100%;
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

const OwnerWrap = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.tertiary + 'D9'};
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
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  border-bottom-width: 1px;
  border-top-width: 1px;
`;

const ProductTitle = styled.Text`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
const ProductCat = styled.Text`
  color: ${({ theme }) => theme.colors.red1};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.red};
  border-radius: ${({ theme }) => theme.border.radius5}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.black};
  elevation: 3;
`;
const Price = styled.Text`
  margin-left: 5px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;

const ItemMidSection = styled.View`
  flex: 2;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
`;

const ItemDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.latoLight};
  margin-bottom: 5px;
`;

const ItemFooter = styled.View`
  flex: 0.8;
  justify-content: space-between;
`;

const ItemRating = styled.Text`
  width: 100%;
  padding: 10px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
`;
const AddWrap = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  margin: auto 0;
  background: ${({ theme }) => theme.colors.tertiary1};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  elevation: 2;
`;

const AddButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1px;
`;
