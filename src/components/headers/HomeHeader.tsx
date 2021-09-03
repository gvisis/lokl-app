import React from 'react';
import styled from 'styled-components/native';

import { SearchModal } from '../modals/SearchModal';

interface HeaderProps {
  title: string;
}

export const HomeHeader: React.FC<HeaderProps> = ({ title }) => (
  <HeaderContainer>
    <TitleText size={40}>{title}</TitleText>
    <SearchModal />
  </HeaderContainer>
);

const HeaderContainer = styled.View<{ height?: number }>`
  flex: 0.3;
  padding: 10px;
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
