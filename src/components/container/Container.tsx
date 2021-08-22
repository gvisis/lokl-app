import React from 'react';
import styled from 'styled-components/native';

export const Container: React.FC = ({ children }) => (
  <AppContainer>{children}</AppContainer>
);

const AppContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.background};
`;
