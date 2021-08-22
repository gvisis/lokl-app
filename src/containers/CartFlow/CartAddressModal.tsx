import React, { useState } from 'react';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { CustomBtn } from '../../components';

export const CartAddressModal = ({ isVisible, setModalVisible }) => {
  const [isAddressDefault, setIsAddressDefault] = useState(false);
  const userInfo = useSelector(state => state.user.userInfo);
  const toggleModal = () => {
    setModalVisible(!isVisible);
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
        <SelectionRow
          userInfo={userInfo}
          setDefault={setIsAddressDefault}
          isDefault={isAddressDefault}
        />
        <CustomBtn center label="Select address" onPress={toggleModal} />
      </ContentWrap>
    </Modal>
  );
};

const SelectionRow: React.FC = ({ isDefault, setDefault, userInfo }) => {
  console.log(userInfo);

  const icons = {
    phone: Platform.OS === 'android' ? 'cellphone-android' : 'cellphone-iphone',
    address: 'map-marker-outline',
    check: 'check',
    sizeSm: 20,
    sizeM: 35,
  };
  return (
    <SelectionWrap activeOpacity={0.4} onPress={() => setDefault(!isDefault)}>
      <WrapLeft>
        <FullName>{userInfo.name}</FullName>
        <RowWrap>
          <RowIcon name={icons.phone} size={icons.sizeSm} />
          <RowLine>{userInfo.email}</RowLine>
        </RowWrap>
        <RowWrap>
          <RowIcon name={icons.address} size={icons.sizeSm} />
          <RowLine>{userInfo.city}</RowLine>
        </RowWrap>
      </WrapLeft>
      {isDefault && (
        <WrapRight>
          <DefaultSelection>Default</DefaultSelection>
          <RowIcon name={icons.check} size={icons.sizeM} />
        </WrapRight>
      )}
    </SelectionWrap>
  );
};

const ContentWrap = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const SelectionWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

const WrapLeft = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 0 5px;
`;
const FullName = styled.Text`
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
`;
const RowWrap = styled.View`
  flex-direction: row;
  padding: 5px 0;
  align-items: center;
`;
const RowLine = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  margin-left: 5px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
`;

const WrapRight = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;
const DefaultSelection = styled.Text`
  text-align: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  color: ${({ theme }) => theme.colors.secondary}; ;
`;

const RowIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
`;
