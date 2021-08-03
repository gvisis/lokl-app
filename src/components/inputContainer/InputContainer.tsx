import React from 'react';
import { AnyObject } from 'src/types/general';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

interface InputProps {
  children: React.ReactNode;
  style?: AnyObject;
}

export const InputContainer: React.FC<InputProps> = ({ children, style }) => (
  <StyledContainer style={style}>{children}</StyledContainer>
);
