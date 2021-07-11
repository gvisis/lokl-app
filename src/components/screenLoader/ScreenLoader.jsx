import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const LoaderContainer = styled.View`
  background: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScreenLoader = props => {
  return (
    <LoaderContainer>
      <ActivityIndicator {...props} />
    </LoaderContainer>
  );
};
