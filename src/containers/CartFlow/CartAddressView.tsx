//! Cart address ui

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import { CartAddressModal } from '.';
import { AddressSelect, CustomBtn } from '../../components';
import { actions } from '../../state/actions';
import { AddEditAddressView } from '../ProfileFlow';

export const CartAddressView: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
  const { address } = useSelector(state => state.user.userInfo);
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // When opened, find the default address and set it redux
  useEffect(() => {
    const selectedAddress =
      address && address.filter(address => address.default)[0];
    dispatch(actions.cart.setShippingAddress(selectedAddress));
  }, []);

  const toggleNewAddressModal = useCallback(() => {
    setNewAddressModalVisible(!newAddressModalVisible);
  }, [newAddressModalVisible]);

  const toggleAddressmodal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <CartWrapTop>
      <CartAddressModal
        setModalVisible={setModalVisible}
        isVisible={modalVisible}
      />
      <NewAddressModal
        onBackdropPress={toggleNewAddressModal}
        isVisible={newAddressModalVisible}
        swipeDirection={['left', 'right']}
        animationIn="slideInDown"
        onBackButtonPress={toggleNewAddressModal}>
        <AddEditAddressView />
      </NewAddressModal>
      <CustomBtn
        fontSize={15}
        onPress={toggleAddressmodal}
        label="Select shipping address"
        center
      />
      <CustomBtn
        secondary
        fontSize={15}
        label="Add new address"
        center
        onPress={toggleNewAddressModal}
      />
      {shippingAddress && (
        <AddressSelect style={{ marginTop: 30 }} address={shippingAddress} />
      )}
    </CartWrapTop>
  );
};
const CartWrapTop = styled.View`
  flex: 1;
  padding: 0 10px;
`;

const NewAddressModal = styled(Modal)`
  padding: 110px 0;
`;
