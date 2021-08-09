import React, { useCallback } from 'react';
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/core';

import { ROUTES } from '../../routes/RouteNames';

export interface ProductScreenProps {
  product: {
    id: string;
    owner: string;
    title: string;
    image: string;
    description?: string;
    category: string;
    price: number;
    delivery: boolean;
    available: boolean;
    rating: number;
  };
  width?: number;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Product: React.FC<ProductScreenProps> = ({
  product,
  width,
  height,
}) => {
  const theme = React.useContext(ThemeContext);
  const navigation = useNavigation();

  const handleSingleProductNav = useCallback(() => {
    navigation.navigate(ROUTES.SingleProduct, { product });
  }, [product]); //! check later if working

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          theme.colors.primary3,
          false,
        )}
        useForeground={true}
        onPress={handleSingleProductNav}>
        <ProductWrap width={width} height={height}>
          <ProductTop>
            <AddToCart>
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
            {product.delivery && (
              <ProductDelivery>Delivery available</ProductDelivery>
            )}
            <ProductImage resizeMode="cover" source={{ uri: product.image }} />
            <ProductOwner>{product.owner}</ProductOwner>
          </ProductTop>
          <ProductBottom>
            <ProductName>{product.title}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <ProductRating>
              <Icon name={'food-apple'} size={20} />
              <Icon name={'food-apple'} size={20} />
              <Icon name={'food-apple-outline'} size={20} />
            </ProductRating>
          </ProductBottom>
        </ProductWrap>
      </TouchableNativeFeedback>
    );
  }
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

const ProductRating = styled.Text`
  width: 100%;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.secondary};
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;

export { ProductWrap };
