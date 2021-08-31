import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AddNewAddress, AddressSelect, CustomBtn } from '../../components';
import { UserAddress } from '../../state/user/UserInterfaces';
import { actions } from '../../state/actions';

interface CartAddressModalProps {
  isVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  toggleNewAddressModal?: () => void;
}

export const CartAddressModal: React.FC<CartAddressModalProps> = ({
  isVisible,
  setModalVisible,
  toggleNewAddressModal,
}) => {
  const { address } = useSelector(state => state.user.userInfo);
  const { shippingAddress } = useSelector(state => state.cart);
  const [selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    shippingAddress && setSelectedId(shippingAddress.id);
  }, [shippingAddress]);

  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
  };

  const toggleModal = () => {
    setModalVisible(!isVisible);
  };

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
      isVisible={isVisible}
    >
      <ContentWrap>
        <ScrollViewWrap showsVerticalScrollIndicator={false}>
          {address ? (
            address.map((addressData: UserAddress) => (
              <AddressSelect
                isModal
                selectedId={selectedId}
                onPress={() => handleSelectAddress(addressData.id)}
                key={addressData.id}
                address={addressData}
              />
            ))
          ) : (
            <AddNewAddress
              toggleNewAddressModal={toggleNewAddressModal}
              text={t('cart:noAddress')}
            />
          )}
          <CustomBtn
            center
            disabled={!address}
            label={t('cart:selectAddress')}
            onPress={handleSelection}
          />
        </ScrollViewWrap>
      </ContentWrap>
    </Modal>
  );
};
const ScrollViewWrap = styled.ScrollView.attrs({ flex: 1 })``;

const ContentWrap = styled.View`
  flex: 0.7;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;
