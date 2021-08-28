import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

export const Container: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <AppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </AppContainer>
  </TouchableWithoutFeedback>
);
const AppContainer = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.background};
`;
