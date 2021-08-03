import React from 'react';
import styled from 'styled-components/native';

interface HeaderProps {
  title: string;
  height?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <HeaderContainer>
    <TitleText>{title}</TitleText>
  </HeaderContainer>
);

const HeaderContainer = styled.View<{ height?: number }>`
  height: ${({ height }) => (height ? height : '20%')};
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary80};
`;
const TitleText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  font-weight: bold;
  text-transform: uppercase;
`;
