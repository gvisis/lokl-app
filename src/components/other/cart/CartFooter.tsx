import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { CustomBtn } from '../..';
import { ROUTES } from '../../../routes/RouteNames';
import { actions } from '../../../state/actions';
import { getFormatedPrice } from '../../../utils/functions';

interface CartFooter {
  quantity: number;
  total: string;
}

// eslint-disable-next-line react/display-name
export const CartFooter: React.FC<CartFooter> = memo(({ quantity, total }) => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { stage, finishPurchase, shippingAddress } = useSelector(
    state => state.cart,
  );

  const handleNavigation = useCallback(() => {
    if (stage === ROUTES.CartItemsView) {
      navigate(ROUTES.CartAddressView);
    }
    if (stage === ROUTES.CartAddressView) {
      navigate(ROUTES.CartPaymentView);
    }
    if (stage === ROUTES.CartPaymentView) {
      dispatch(actions.cart.cartFinishPurchase(true));
    }
  }, [stage]);

  useFocusEffect(
    useCallback(() => {
      const currentScreen = getFocusedRouteNameFromRoute(route);
      dispatch(actions.cart.navigateCart(currentScreen));
    }, [route]),
  );

  return (
    <CartFooterWrap>
      <TotalItems>
        {t('cart:items')} {quantity}
      </TotalItems>
      <TotalPrice>
        {t('cart:total')}
        {getFormatedPrice(parseFloat(total))}
      </TotalPrice>
      {stage !== ROUTES.CartPaymentView ? (
        <CustomBtn
          center
          disabled={quantity === 0 || finishPurchase}
          onPress={handleNavigation}
          label={t('common:continue')}
        />
      ) : (
        <CustomBtn
          center
          secondary
          disabled={quantity === 0 || finishPurchase || !shippingAddress}
          onPress={handleNavigation}
          label={
            !shippingAddress ? t('cart:addShippingAddress') : t('cart:pay')
          }
        />
      )}
    </CartFooterWrap>
  );
});

const TotalPrice = styled.Text`
  padding: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
`;
const TotalItems = styled.Text`
  padding: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
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
