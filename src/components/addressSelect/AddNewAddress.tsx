import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { useFunction } from '../../utils/hooks';
import { ROUTES } from '../../routes/RouteNames';

export const AddNewAddress = ({ text }) => {
  const navigation = useNavigation();
  const handleAddNewAddress = useFunction(
    navigation.navigate,
    ROUTES.AddAddress,
  );
  return (
    <AddAddress onPress={handleAddNewAddress}>
      <Icon name="plus-circle-outline" size={35} color={'grey'} />
      <CustomText>{text}</CustomText>
    </AddAddress>
  );
};

const AddAddress = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
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
