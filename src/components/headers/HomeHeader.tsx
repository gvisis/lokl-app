import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface HeaderProps {
  title: string;
}

export const HomeHeader: React.FC<HeaderProps> = ({ title }) => {
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation();
  const cartQty = useSelector(state => state.cart.quantity);

  const handleFocus = useCallback(() => {
    setFocused(!focused);
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <HeaderContainer>
        <TitleText size={40}>{title}</TitleText>
        <IconWrap>
          {cartQty !== 0 && <BasketQty>{cartQty}</BasketQty>}
          <Basket
            name={cartQty === 0 ? 'basket-outline' : 'basket'}
            size={30}
          />
        </IconWrap>
        <SearchRow focused={focused}>
          <SearchBar
            placeholder={t('home:searchBar')}
            placeholderTextColor="#9c9c9c"
            onFocus={handleFocus}
            onBlur={handleFocus}
          />
          <IconWrap>
            <FilterSort name="menu-open" size={30} color={'green'} />
          </IconWrap>
        </SearchRow>
      </HeaderContainer>
    </TouchableWithoutFeedback>
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
`;

// Search row
const SearchRow = styled.View`
  width: 100%;
  padding: 5px;
  border-radius: ${({ theme }) => theme.border.radius15}px;
  flex-direction: row;
  margin-top: 20px;
  border-width: 1px;
  border-color: ${({ theme, focused }: { focused: boolean }) =>
    focused ? theme.colors.secondary : theme.colors.lightGrey2};
`;

const SearchBar = styled.TextInput`
  flex: 3;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  border-color: ${({ theme }) => theme.colors.tertiary2};
  letter-spacing: 1px;
  border-right-width: 1px;
`;

const FilterSort = styled(Icon)`
  color: ${({ theme }) => theme.colors.tertiary2};
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
