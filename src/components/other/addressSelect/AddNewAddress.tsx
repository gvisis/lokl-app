import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ROUTES } from '../../../routes/RouteNames';
import { useFunction } from '../../../utils/hooks';

interface AddNewAddress {
  text: string;
  toggleNewAddressModal?: () => void;
}

export const AddNewAddress: React.FC<AddNewAddress> = ({
  text,
  toggleNewAddressModal,
}) => {
  const { navigate } = useNavigation();
  const theme = useTheme();

  const handleAddNewAddress = useFunction(navigate, ROUTES.AddAddress);

  return (
    <AddAddress
      onPress={
        toggleNewAddressModal ? toggleNewAddressModal : handleAddNewAddress
      }
    >
      <Icon
        name="plus-circle-outline"
        size={35}
        color={theme.colors.lightGrey}
      />
      <CustomText>{text}</CustomText>
    </AddAddress>
  );
};

const AddAddress = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;
const CustomText = styled.Text`
  margin: 10px;
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  color: ${({ theme }) => theme.colors.secondary};
`;
