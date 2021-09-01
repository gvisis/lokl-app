import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  AddressSelect,
  Container,
  EmptyView,
  ProfileRow,
} from '../../components';
import { actions } from '../../state/actions';

export const CartPaymentView: React.FC = () => {
  const { cart, shippingAddress } = useSelector(state => state.cart);
  const { name, email } = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(actions.cart.getCartTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      {cart.length === 0 ? (
        <EmptyView text={t('cart:empty')} />
      ) : (
        <Container>
          <PaymentHeaderWrap>
            <PaymentTitle>{t('cart:paymentDetails')}</PaymentTitle>
            <PaymentSubtitle>
              {t('cart:completePaymentSubtitle')}
            </PaymentSubtitle>
          </PaymentHeaderWrap>
          <PaymentMidSection>
            <ProfileRow
              editable
              text={name}
              label={t('profile:fullName')}
              placeholder={t('profile:namePlaceholder')}
            />
            <ProfileRow
              editable
              text={email}
              label={t('common:email')}
              placeholder={t('profile:emailPlaceholder')}
            />
            <RowLabel>{t('cart:cardDetails')}</RowLabel>
            <CardInputWrap>
              <CardInput
                flex={0.8}
                placeholder={t('cart:cardDetailsPlaceholder')}
                maxLength={16}
              />
              <CardInput flex={0.3} maxLength={5} placeholder={'MM / YY'} />
              <CardInput flex={0.2} maxLength={3} placeholder={'CVC'} />
            </CardInputWrap>
            {shippingAddress && (
              <ShipingAddressWrap>
                <RowLabel>{t('cart:shippingAddress')}</RowLabel>
                <AddressSelect disabled={true} address={shippingAddress} />
              </ShipingAddressWrap>
            )}
          </PaymentMidSection>
        </Container>
      )}
    </Container>
  );
};

const CardInputWrap = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 20px;
  elevation: 1;
`;

const CardInput = styled.TextInput.attrs({ keyboardType: 'numeric' })<{
  flex: number;
}>`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  flex: ${props => (props.flex ? props.flex : 1)};
`;

const PaymentHeaderWrap = styled.View`
  justify-content: center;
  padding: 10px;
  flex: 0.15;
  elevation: 1;
  background-color: ${({ theme }) => theme.colors.lightGrey2}; ;
`;

const ShipingAddressWrap = styled.View`
  height: 80%;
  margin-top: 15px;
`;

const RowLabel = styled.Text`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
`;

const PaymentMidSection = styled.View`
  flex: 0.5;
  padding: 20px 10px;
`;
const PaymentTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  margin-bottom: 5px;
  elevation: 2;
`;

const PaymentSubtitle = styled.Text`
font-size: ${({ theme }) => theme.fonts.size.s}px
font-family: ${({ theme }) => theme.fonts.family.nexaLight}
`;
