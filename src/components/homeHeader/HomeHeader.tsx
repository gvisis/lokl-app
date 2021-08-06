import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface HeaderProps {
  title: string;
}

export const HomeHeader: React.FC<HeaderProps> = ({ title }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <HeaderContainer>
      <TitleText size={40}>{title}</TitleText>
      <IconWrap>
        <Basket name="basket-outline" size={30} />
      </IconWrap>
      <SearchRow>
        <SearchBar placeholder={'Search for ...'} />
        <IconWrap>
          <FilterSort name="menu-open" size={30} color={'green'} />
        </IconWrap>
      </SearchRow>
    </HeaderContainer>
  </TouchableWithoutFeedback>
);

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
  background: ${({ theme }) => theme.colors.red1};
  border-radius: ${({ theme }) => theme.border.radius15}px;
  flex-direction: row;
  margin-top: 20px;
`;

const SearchBar = styled.TextInput`
  flex: 3;
  background-color: ${({ theme }) => theme.colors.red1};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
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
