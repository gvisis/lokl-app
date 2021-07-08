import React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../assets/theme/default';

const {
  colors,
  fonts: {size},
} = theme;
const HeaderContainer = styled.View`
  height: ${props => (props.height ? props.height : '20%')};
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary80};
`;
const TitleText = styled.Text`
  color: ${colors.white}
  font-size: ${size.xxl};
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
