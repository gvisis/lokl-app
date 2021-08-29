import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { CustomBtn } from '..';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { useFunction } from '../../utils/hooks';

interface CartFooter {
  quantity: number;
  total: number;
}

// eslint-disable-next-line react/display-name
export const CartFooter: React.FC<CartFooter> = memo(({ quantity, total }) => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { stage, finishPurchase } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleNavigation = useCallback(() => {
    if (stage === ROUTES.CartItemsView) {
      navigate(ROUTES.CartAddressView);
    } else if (stage === 'payFinish') {
      dispatch(actions.cart.cartFinishPurchase(true));
    } else {
      navigate(stage);
    }
  }, [stage]);

  useEffect(() => {
    const currentScreen = getFocusedRouteNameFromRoute(route);
    dispatch(actions.cart.navigateCart(currentScreen));
    console.log(currentScreen);
  }, [navigate, route, stage]);

  return (
    <CartFooterWrap>
      <TotalItems>
        {t('cart:items')} {quantity}
      </TotalItems>
      <TotalPrice>
        {t('cart:total')}
        {total}
      </TotalPrice>
      {getFocusedRouteNameFromRoute(route) !== ROUTES.CartPaymentView ? (
        <CustomBtn
          center
          disabled={quantity === 0}
          onPress={handleNavigation}
          label={t('common:continue')}
        />
      ) : (
        <CustomBtn
          center
          secondary
          disabled={quantity === 0 || finishPurchase}
          onPress={handleNavigation}
          label={t('cart:pay')}
        />
      )}
    </CartFooterWrap>
  );
});

const TotalPrice = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;
const TotalItems = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;

const CartFooterWrap = styled.View`
  justify-content: center;
  flex: 0.2;
  padding: 10px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
