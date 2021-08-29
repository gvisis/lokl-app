import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';

import { ROUTES } from './RouteNames';
import { RootStackParamList } from '../types/general';
import { CartAddressView, CartItemsView } from '../containers/CartFlow';
import { CartFooter, Container, EmptyView, ScreenLoader } from '../components';
import { CartPaymentView } from '../containers/CartFlow/CartPaymentView';
import { actions } from '../state/actions';

const TopBar = createMaterialTopTabNavigator<RootStackParamList>();

export const CartNavigation: React.FC = () => {
  const { finishPurchase, stage, quantity, total } = useSelector(
    state => state.cart,
  );
  const { t } = useTranslation();

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stage) {
      dispatch(actions.cart.setCartStage(ROUTES.CartItemsView));
    }
  }, [stage]);

  // FAKE LOADING WHEN PURCHASE IS FINISHED
  if (finishPurchase) {
    return (
      <>
        <EmptyView text={'Finishing your purchase... Thank you for waiting'} />
        <ScreenLoader size={50} color={theme.colors.primary} />
      </>
    );
  }

  return (
    <Container>
      <TopBar.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}>
        <TopBar.Screen
          name={ROUTES.CartItemsView}
          component={CartItemsView}
          options={{ tabBarLabel: t('cart:title') }}
        />
        <TopBar.Screen
          name={ROUTES.CartAddressView}
          component={CartAddressView}
          options={{ tabBarLabel: t('profile:address') }}
        />
        <TopBar.Screen
          name={ROUTES.CartPaymentView}
          component={CartPaymentView}
          options={{ tabBarLabel: t('cart:payment') }}
        />
      </TopBar.Navigator>
      <CartFooter quantity={quantity} total={total} />
    </Container>
  );
};
