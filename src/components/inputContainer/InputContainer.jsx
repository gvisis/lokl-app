import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
export const InputContainer = ({children}) => {
  return <StyledContainer>{children}</StyledContainer>;
};
