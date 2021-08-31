import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  min,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash/lib/module/v1';
import styled from 'styled-components/native';

import { actions } from '../../../state/actions';
import { useFunction } from '../../../utils/hooks';
import { RemoveAction } from '../..';
import { CartItem } from './CartItem';
import { CompanyProduct } from '../../../state/app/AppInterfaces';

interface CartItemLayout {
  item?: CompanyProduct;
}

export const CartItemLayout: React.FC<CartItemLayout> = ({ item }) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const snapPoints = [-width, -80, 0];

  const handleOnSwipe = useFunction(
    dispatch,
    actions.cart.removeFromCart(item),
  );

  const { gestureHandler, translation, velocity, state } =
    usePanGestureHandler();
  const ITEM_HEIGHT = 120;
  const translateX = useValue(1);
  const deleteOpacity = useValue(1);
  const offsetX = useValue(0);
  const clock = useClock();
  const height = useValue(ITEM_HEIGHT);

  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, min(translation.x, 0))),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: ITEM_HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], handleOnSwipe)),
      ]),
    ],
    [handleOnSwipe],
  );

  return (
    <Animated.View>
      <ActionWrap style={{ ...StyleSheet.absoluteFillObject }}>
        <TouchableOpacity onPress={() => shouldRemove.setValue(1)}>
          <RemoveAction x={abs(translateX)} {...{ deleteOpacity }} />
        </TouchableOpacity>
      </ActionWrap>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ height, transform: [{ translateX }] }}>
          <CartItem {...{ shouldRemove }} {...{ item }} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const ActionWrap = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  justify-content: flex-end;
  overflow: hidden;
`;
