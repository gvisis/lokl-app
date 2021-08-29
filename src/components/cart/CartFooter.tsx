import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

import { CustomBtn } from '..';
import { ROUTES } from '../../routes/RouteNames';

interface CartFooter {
  quantity: number;
  total: number;
}

export const CartFooter: React.FC<CartFooter> = ({ quantity, total }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <CartFooterWrap>
      <TotalItems>
        {t('cart:items')} {quantity}
      </TotalItems>
      <TotalPrice>
        {t('cart:total')}
        {total} €
      </TotalPrice>
      <CustomBtn
        center
        secondary
        disabled={quantity === 0}
        onPress={() => navigation.navigate(ROUTES.CartAddressView)}
        label={t('common:continue')}
      />
    </CartFooterWrap>
  );
};

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
  flex: 0.15;
  padding: 10px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
