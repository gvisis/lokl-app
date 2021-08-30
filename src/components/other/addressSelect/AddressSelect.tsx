import React from 'react';
import { GestureResponderEvent, Platform } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import { RadioButton } from '../..';
import { UserAddress } from '../../../state/user/UserInterfaces';

interface AddressSelectProps {
  address: UserAddress;
  modal?: boolean;
  selectedId?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const AddressSelect: React.FC<AddressSelectProps> = ({
  address,
  modal,
  selectedId,
  onPress,
  ...props
}) => {
  const icons = {
    phone: Platform.OS === 'android' ? 'cellphone-android' : 'cellphone-iphone',
    address: 'map-marker-outline',
    check: 'check',
    street: 'mailbox-outline',
    sizeSm: 20,
    sizeM: 35,
  };
  const { t } = useTranslation();
  const isSelected = address.id === selectedId;

  return (
    <SelectionWrap onPress={onPress} isSelected={isSelected} {...props}>
      <WrapLeft>
        <FullName>{address.name}</FullName>
        <RowWrap>
          <RowIcon name={icons.phone} size={icons.sizeSm} />
          <RowLine>{address.phone}</RowLine>
        </RowWrap>
        <RowWrap>
          <RowIcon name={icons.street} size={icons.sizeSm} />
          <RowLine>
            {address.street}, {address.postcode}
          </RowLine>
        </RowWrap>
        <RowWrap>
          <RowIcon name={icons.address} size={icons.sizeSm} />
          <RowLine>
            {address.city}, {address.country}
          </RowLine>
        </RowWrap>
      </WrapLeft>
      {address.default && (
        <WrapRight>
          <DefaultSelection>{t('common:default')}</DefaultSelection>
        </WrapRight>
      )}
      {modal && <RadioButton status={isSelected ? true : false} />}
    </SelectionWrap>
  );
};

const SelectionWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 5px;
  border-width: 1px;
  border-radius: 10px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary2 : theme.colors.background};
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
