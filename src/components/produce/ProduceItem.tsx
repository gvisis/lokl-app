import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export const ProduceItem: React.FC = ({ itemTitle }) => (
  <Item>
    <Text>{itemTitle}</Text>
  </Item>
);

const Item = styled.View`
  margin: 0 10px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius25}px;
  background: ${({ theme }) => theme.colors.red1}; ;
`;
