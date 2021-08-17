import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.lightGrey2};
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

export const ScreenLoader: React.FC<ActivityIndicatorProps> = props => (
  <LoaderContainer>
    <ActivityIndicator {...props} />
  </LoaderContainer>
);
