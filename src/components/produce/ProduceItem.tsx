import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';

export const ProduceItem: React.FC = ({ item }) => {
  const theme = React.useContext(ThemeContext);
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          theme.colors.primary3,
          false,
        )}
        useForeground={true}>
        <Item>
          <ItemText>{item.title}</ItemText>
          <ItemImage resizeMode="cover" source={{ uri: item.image }} />
        </Item>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={0.5}>
        <Item>
          <ItemText>{item.title}</ItemText>
          <ItemImage resizeMode="cover" source={{ uri: item.image }} />
        </Item>
      </TouchableOpacity>
    );
  }
};

const Item = styled.View`
  margin: 10px;
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius25}px;
  background: ${({ theme }) => theme.colors.red1};
  overflow: hidden;
  elevation: 3;
`;
const ItemText = styled.Text`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 5px 8px;
  opacity: 0.7;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary3};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  letter-spacing: 2px;
  background: ${({ theme }) => theme.colors.secondary};
`;
const ItemImage = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;
