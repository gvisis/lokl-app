import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { SearchModal } from '../modals/SearchModal';

interface HeaderProps {
  title: string;
}

export const HomeHeader: React.FC<HeaderProps> = ({ title }) => {
  const cartQty = useSelector(state => state.cart.quantity);

  return (
    <HeaderContainer>
      <TitleText size={40}>{title}</TitleText>
      <IconWrap>
        {cartQty !== 0 && <BasketQty>{cartQty}</BasketQty>}
        <Basket name={cartQty === 0 ? 'basket-outline' : 'basket'} size={30} />
      </IconWrap>
      <SearchModal />
    </HeaderContainer>
  );
};

const IconWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 0.6;
  margin: 5px;
`;

const Basket = styled(Icon)`
  padding: 10px;
  border-radius: ${({ theme }) => theme.border.radius30}px;
  background-color: ${({ theme }) => theme.colors.red1};
  color: ${({ theme }) => theme.colors.tertiary2};
`;

const BasketQty = styled.Text`
  position: absolute;
  bottom: -10px;
  min-width: 40%;
  max-width: 100%;
  height: 20px;
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.tertiary2 + 'B3'};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  border-color: ${({ theme }) => theme.colors.red1};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.border.radius50}px;
  padding: 0 5px;
`;

const HeaderContainer = styled.View<{ height?: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background}; ;
`;

const TitleText = styled.Text<{ size: number }>`
  color: ${({ theme }) => theme.colors.secondary1};
  font-size: ${({ theme, size }) => (size ? size : theme.fonts.size.xxxl)}px;
  padding: 30px;
  line-height: ${({ theme, size }) =>
    size ? 10 + size : 10 + theme.fonts.size.xxxl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  flex: 3;
`;
