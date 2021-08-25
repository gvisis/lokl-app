import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewAddress, AddressSelect, CustomBtn } from '../../components';
import { UserAddress } from '../../state/user/UserReducer';
import { actions } from '../../state/actions';

export const CartAddressModal = ({ isVisible, setModalVisible }) => {
  const { address } = useSelector(state => state.user.userInfo);
  const { shippingAddress } = useSelector(state => state.cart);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    shippingAddress && setSelectedId(shippingAddress.id);
  }, [shippingAddress]);

  // When selected, set the selected id to local state
  const handleSelectAddress = useCallback(
    (id: string) => {
      setSelectedId(id);
    },
    [setSelectedId],
  );

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isVisible);
  };

  // When clicked, select address to state
  const handleSelection = () => {
    const selectedAddress = address.filter(
      address => address.id === selectedId,
    )[0];
    dispatch(actions.cart.setShippingAddress(selectedAddress));
    toggleModal();
  };

  return (
    <Modal
      onBackButtonPress={toggleModal}
      animationIn="slideInDown"
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}
      swipeDirection={['left', 'right']}
      onSwipeComplete={toggleModal}
      isVisible={isVisible}>
      <ContentWrap>
        {address ? (
          address.map((addressData: UserAddress) => (
            <AddressSelect
              modal
              selectedId={selectedId}
              onPress={() => handleSelectAddress(addressData.id)}
              key={addressData.id}
              address={addressData}
            />
          ))
        ) : (
          <AddNewAddress text={'No addresses available. Add new?'} />
        )}
        <CustomBtn center label="Select address" onPress={handleSelection} />
      </ContentWrap>
    </Modal>
  );
};

const ContentWrap = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
`;
