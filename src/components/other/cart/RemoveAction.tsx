import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Animated, {
  add,
  cond,
  divide,
  interpolateNode,
  lessThan,
  multiply,
  sub,
} from 'react-native-reanimated';
import styled, { useTheme } from 'styled-components/native';

interface ActionProps {
  x: Animated.Node<number>;
  deleteOpacity: Animated.Node<number>;
}
export const RemoveAction = ({ x, deleteOpacity }: ActionProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const size = cond(lessThan(x, 10), x, add(x, sub(x, 10)));
  const translateX = cond(lessThan(x, 10), 0, divide(sub(x, 10), 2));
  const textOpacity = interpolateNode(size, {
    inputRange: [50, 80],
    outputRange: [0, 1],
  });
  return (
    <Animated.View
      style={{
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: size,
        width: size,
        transform: [{ translateX }],
      }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: multiply(textOpacity, deleteOpacity),
        }}
      >
        <RemoveText>{t('cart:remove')}</RemoveText>
      </Animated.View>
    </Animated.View>
  );
};
const RemoveText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  color: ${({ theme }) => theme.colors.white};
`;
