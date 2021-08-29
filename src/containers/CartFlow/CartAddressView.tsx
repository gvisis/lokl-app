import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { CartAddressModal } from '.';
import { AddressSelect, Container, CustomBtn } from '../../components';
import { actions } from '../../state/actions';
import { AddEditAddressView } from '../ProfileFlow';

export const CartAddressView: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
  const { address } = useSelector(state => state.user.userInfo);
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // When opened, find the default address and set it redux
  useEffect(() => {
    const selectedAddress =
      address && address.filter(address => address.default)[0];
    dispatch(actions.cart.setShippingAddress(selectedAddress));
  }, [address]);

  const toggleNewAddressModal = useCallback(() => {
    setNewAddressModalVisible(!newAddressModalVisible);
  }, [newAddressModalVisible]);

  const toggleAddressmodal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <Container>
      <CartWrapTop>
        <CartAddressModal
          setModalVisible={setModalVisible}
          isVisible={modalVisible}
        />
        <Modal
          onBackdropPress={toggleNewAddressModal}
          isVisible={newAddressModalVisible}
          swipeDirection={['left', 'right']}
          onSwipeComplete={toggleNewAddressModal}
          animationIn="slideInDown"
          avoidKeyboard={true}
          onBackButtonPress={toggleNewAddressModal}>
          <AddEditAddressView />
        </Modal>
        <CustomBtn
          fontSize={15}
          onPress={toggleAddressmodal}
          label={t('cart:selectShippingAddress')}
          center
        />
        <CustomBtn
          secondary
          fontSize={15}
          label={t('common:addNewAddress')}
          center
          onPress={toggleNewAddressModal}
        />
        {shippingAddress && (
          <AddressSelect
            selectedId={shippingAddress.id}
            modal
            address={shippingAddress}
          />
        )}
      </CartWrapTop>
    </Container>
  );
};
const CartWrapTop = styled.View`
  padding: 0 10px;
`;
