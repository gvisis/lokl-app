import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableNativeFeedback } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../routes/RouteNames';
import { CompanyProduct, CompanyProps } from '../../../state/app/AppInterfaces';
import { actions } from '../../../state/actions';
import {
  calcRatingAverage,
  getProductOwnerTitle,
} from '../../../utils/functions';
import { useFunction } from '../../../utils/hooks';
import { CART_ACTION } from '../../../types/general';

export interface ProductScreenProps {
  item?: CompanyProduct;
  allCompanies?: CompanyProps[];
  width?: number;
  height?: number;
  productOwnerTitle?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Product: React.FC<ProductScreenProps> = ({
  item,
  allCompanies,
  width,
  height,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const ratingCustomImage = require('../../../assets/images/ratingfull.png');

  const productOwnerTitle: string = getProductOwnerTitle(allCompanies, item);

  const handleSingleProductNav = useFunction(navigate, ROUTES.SingleProduct, {
    item,
    productOwnerTitle,
  });
  // Add ONE item to cart
  const handleAddToCart = useCallback(() => {
    const cartProduct = { ...item };
    dispatch(actions.cart.checkCartActions(CART_ACTION.ADD, cartProduct));
  }, [dispatch]);

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(theme.colors.primary3, false)}
      useForeground={true}
      onPress={handleSingleProductNav}>
      <ProductWrap width={width} height={height}>
        <ProductTop>
          <AddToCart onPress={handleAddToCart}>
            <LinearGradient
              colors={[
                theme.colors.secondary,
                theme.colors.primary,
                theme.colors.primary2,
                'rgba(0, 0, 0, 0)',
              ]}
              locations={[0, 0.3, 0.5, 1]}
              style={{
                flex: 1,
              }}>
              <CartIcon name={'basket-fill'} size={25} />
            </LinearGradient>
          </AddToCart>
          {item.delivery && (
            <ProductDelivery>{t('company:delivery')}</ProductDelivery>
          )}
          <ProductImage resizeMode="cover" source={{ uri: item.image }} />
          <ProductOwner>{productOwnerTitle}</ProductOwner>
        </ProductTop>
        <ProductBottom>
          <ProductName>{item.title}</ProductName>
          <ProductPrice>{item.price}€</ProductPrice>
          <ProductRating>
            <AirbnbRating
              count={5}
              showRating={false}
              isDisabled={true}
              defaultRating={calcRatingAverage(item.ratings)}
              size={15}
              selectedColor={theme.colors.red}
              unSelectedColor={theme.colors.red1}
              starImage={ratingCustomImage}
            />
          </ProductRating>
        </ProductBottom>
      </ProductWrap>
    </TouchableNativeFeedback>
  );
};

const ProductWrap = styled.View`
  margin: 10px;
  width: ${(props: ProductScreenProps) => props.width}px;
  height: ${(props: ProductScreenProps) => props.height}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.primary1};
  overflow: hidden;
  elevation: 3;
`;

const ProductTop = styled.View`
  flex: 1.5;
  width: 100%;
`;
const AddToCart = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 60px;
`;

const CartIcon = styled(Icon)`
  margin: 5px;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
`;

const ProductImage = styled.ImageBackground`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const ProductOwner = styled.Text`
  width: 100%;
  padding: 5px;
  position: absolute;
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  background: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
`;

const ProductBottom = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px 10px;
`;

const ProductName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.secondary};
`;
const ProductPrice = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.bentonBook};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
`;
const ProductDelivery = styled.Text`
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: ${({ theme }) => theme.border.radius5}px;
  padding: 3px 5px;
  background: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
`;

const ProductRating = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
`;

export { ProductWrap };
