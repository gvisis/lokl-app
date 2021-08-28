import React from 'react';
import { StyleProp } from 'react-native';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
`;

interface InputProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export const InputContainer: React.FC<InputProps> = ({ children, style }) => (
  <StyledContainer style={style}>{children}</StyledContainer>
);
