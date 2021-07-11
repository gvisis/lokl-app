import React from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  height: ${({ height }) => (height ? height : '20%')};
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary80};
`;
const TitleText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 13;
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: bold;
  text-transform: uppercase;
`;

export const Header = ({ title }) => (
  <HeaderContainer>
    <TitleText>{title}</TitleText>
  </HeaderContainer>
);
