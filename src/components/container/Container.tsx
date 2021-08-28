import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container: React.FC = ({ children }) => (
  <AppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    {children}
  </AppContainer>
);
const AppContainer = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.background};
`;
