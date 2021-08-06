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
  justify-content: center;
  flex: 1.2;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TitleText = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;
