import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';

import { ProductWrap } from './Product';
import { AnyObject } from '../../types/general';

interface ProduceItemProps {
  item: AnyObject; //! Change after item propertires are known
  width?: number;
  height?: number;
}
export const ProduceItem: React.FC<ProduceItemProps> = ({
  item,
  width,
  height,
}) => {
  const theme = React.useContext(ThemeContext);
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          theme.colors.primary3,
          false,
        )}
        useForeground={true}>
        <ProductWrap width={width} height={height}>
          <ItemText>{item.title}</ItemText>
          <ItemImage resizeMode="cover" source={{ uri: item.image }} />
        </ProductWrap>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <ProductWrap width={width} height={height}>
          <ItemText>{item.title}</ItemText>
          <ItemImage resizeMode="cover" source={{ uri: item.image }} />
        </ProductWrap>
      </TouchableOpacity>
    );
  }
};

const ItemText = styled.Text`
  color: ${({ theme }) => theme.colors.primary3};
  background: ${({ theme }) => theme.colors.secondary};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 5px 8px;
  opacity: 0.7;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  letter-spacing: 2px;
`;
const ItemImage = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

ProductWrap.defaultProps = {
  width: 150,
  height: 150,
};
