import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Container, CustomBtn } from '../../components';
import { ROUTES } from '../../routes/RouteNames';

export const CartView: React.FC = ({ navigation }) => (
  <Container>
    <CartHeader>
      <CartHeaderText>Products &gt; Address &gt; Payment</CartHeaderText>
    </CartHeader>
    <CartWrapTop>
      <CartItem>
        <CartItemLeft>
          <ItemImage
            resizeMode="contain"
            source={{ uri: 'https://picsum.photos/200' }}
          />
        </CartItemLeft>
        <CartItemMid>
          <ItemName>Item name</ItemName>
          <ItemSeller>Company</ItemSeller>
          <ItemPrice>$ 233</ItemPrice>
        </CartItemMid>
        <CartItemRight>
          <TouchableOpacity onPress={() => 'decrease'}>
            <IncDecButton name="plus-circle" size={25} />
          </TouchableOpacity>
          <QuantityValue>0</QuantityValue>
          <TouchableOpacity onPress={() => 'increase'}>
            <IncDecButton name="minus-circle" size={25} />
          </TouchableOpacity>
        </CartItemRight>
      </CartItem>
      <CartItem>
        <CartItemLeft>
          <ItemImage
            resizeMode="contain"
            source={{ uri: 'https://picsum.photos/200' }}
          />
        </CartItemLeft>
        <CartItemMid>
          <ItemName>Item name</ItemName>
          <ItemSeller>Company</ItemSeller>
          <ItemPrice>$ 129</ItemPrice>
        </CartItemMid>
        <CartItemRight>
          <TouchableOpacity onPress={() => 'decrease'}>
            <IncDecButton name="plus-circle" size={25} />
          </TouchableOpacity>
          <QuantityValue>0</QuantityValue>
          <TouchableOpacity onPress={() => 'increase'}>
            <IncDecButton name="minus-circle" size={25} />
          </TouchableOpacity>
        </CartItemRight>
      </CartItem>
    </CartWrapTop>
    <CartFooter>
      <TotalItems>Items: 2</TotalItems>
      <TotalPrice>Total price: $135</TotalPrice>
      <CustomBtn
        center
        secondary
        onPress={() => navigation.navigate(ROUTES.CartAddress)}
        label="Continue"
      />
    </CartFooter>
  </Container>
);
const centerItems = css`
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const CartWrapTop = styled.View`
  flex: 3;
  align-items: flex-start;
  padding: 0 10px;
`;

const CartHeader = styled.View`
  background: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.secondary1};
  margin-bottom: 5px;
`;

const CartHeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
`;

const CartItem = styled.View`
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

const TotalPrice = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;
const TotalItems = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;

const CartFooter = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary1};
  justify-content: center;
  flex: 0.5;
  padding: 10px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
