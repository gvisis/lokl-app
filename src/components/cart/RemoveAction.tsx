import React from 'react';
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
import styled from 'styled-components/native';

interface ActionProps {
  x: Animated.Node<number>;
  deleteOpacity: Animated.Node<number>;
}
export const RemoveAction = ({ x, deleteOpacity }: ActionProps) => {
  const size = cond(lessThan(x, 10), x, add(x, sub(x, 10)));
  const translateX = cond(lessThan(x, 10), 0, divide(sub(x, 10), 2));
  const textOpacity = interpolateNode(size, {
    inputRange: [50, 80],
    outputRange: [0, 1],
  });
  return (
    <Animated.View
      style={{
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        height: size,
        width: size,
        transform: [{ translateX }],
      }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: multiply(textOpacity, deleteOpacity),
        }}>
        <RemoveText>Remove</RemoveText>
      </Animated.View>
    </Animated.View>
  );
};
const RemoveText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  color: ${({ theme }) => theme.colors.white};
`;
