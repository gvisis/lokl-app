//! Cart address ui

import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { CartAddressModal } from '.';
import { AddressSelect, CustomBtn } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { ComponentNavProps } from '../../types/general';

export const CartAddressView: React.FC<ComponentNavProps<ROUTES.Address>> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { address } = useSelector(state => state.user.userInfo);
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // When opened, find the default address and set it redux
  useEffect(() => {
    const selectedAddress =
      address && address.filter(address => address.default)[0];
    console.log('selected', selectedAddress);
    dispatch(actions.cart.setShippingAddress(selectedAddress));
  }, []);

  const handleNewAddressNavigate = useCallback(() => {
    navigation.navigate(ROUTES.AddAddress);
  }, [navigation]);

  console.log('shipping', shippingAddress);

  return (
    <CartWrapTop>
      {modalVisible && (
        <CartAddressModal
          setModalVisible={setModalVisible}
          isVisible={modalVisible}
        />
      )}
      <CustomBtn
        fontSize={15}
        onPress={() => setModalVisible(!modalVisible)}
        label="Select shipping address"
        center
      />
      <CustomBtn
        secondary
        fontSize={15}
        label="Add new address"
        center
        onPress={handleNewAddressNavigate}
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
