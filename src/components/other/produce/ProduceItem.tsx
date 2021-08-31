import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';

import { AnyObject, SizeProps } from '../../../types/general';
import { getImagesFromObject } from '../../../utils/functions';
import { useFunction } from '../../../utils/hooks';

interface ProduceItemProps {
  item: AnyObject;
  width?: number;
  height?: number;
  isAdItem?: boolean;
  onPress?: string;
}
export const ProduceItem: React.FC<ProduceItemProps> = ({
  item,
  width,
  height,
  isAdItem,
  onPress,
}) => {
  const { navigate } = useNavigation();
  const theme = useTheme();
  const adsImage = item.images && getImagesFromObject(item)[0].url;

  const handlePress = useFunction(navigate, onPress, {
    item,
  });

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          theme.colors.primary3,
          false,
        )}
        useForeground={true}
        onPress={handlePress}
      >
        <ProductWrap width={width} height={height}>
          <ItemText>{item.title}</ItemText>
          <ItemImage
            resizeMode="cover"
            source={{
              uri: !isAdItem ? item.image : adsImage,
            }}
          />
        </ProductWrap>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <ProductWrap width={width} height={height}>
          <ItemText>{item.title}</ItemText>
          <ItemImage
            resizeMode="cover"
            source={{
              uri: !isAdItem ? item.image : adsImage,
            }}
          />
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
const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const ProductWrap = styled.View<SizeProps>`
  margin: 10px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.primary1};
  overflow: hidden;
  elevation: 3;
`;

ProductWrap.defaultProps = {
  width: 150,
  height: 150,
};
