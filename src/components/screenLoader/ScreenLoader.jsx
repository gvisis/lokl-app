import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { themes } from '../../styles';

const { dark } = themes;

const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${dark.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const ScreenLoader = props => (
  <LoaderContainer>
    <ActivityIndicator {...props} />
  </LoaderContainer>
);
