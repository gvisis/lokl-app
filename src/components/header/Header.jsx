import React from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  height: ${props => (props.height ? props.height : '20%')};
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #02304795;
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
