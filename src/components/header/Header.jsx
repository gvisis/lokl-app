import React from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  background-color: #023047;
  height: 30%;
  align-items: center;
  justify-content: center;
`;
const TitleText = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Header = ({title}) => {
  return (
    <HeaderContainer>
      <TitleText>{title}</TitleText>
    </HeaderContainer>
  );
};
