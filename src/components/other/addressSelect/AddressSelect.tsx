import React from 'react';
import { GestureResponderEvent, Platform } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { UserAddress } from '../../../state/user/UserInterfaces';
import { actions } from '../../../state/actions';
import { RadioButton } from '../..';

interface AddressSelectProps {
  address: UserAddress;
  isModal?: boolean;
  disabled?: boolean;
  selectedId?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const AddressSelect: React.FC<AddressSelectProps> = ({
  address,
  isModal,
  selectedId,
  onPress,
  ...props
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const icons = {
    phone: Platform.OS === 'android' ? 'cellphone-android' : 'cellphone-iphone',
    address: 'map-marker-outline',
    check: 'check',
    street: 'mailbox-outline',
    sizeSm: 20,
    sizeM: 35,
  };
  const handleRemoveAddress = (addressId: string) => {
    dispatch(actions.user.removeAddress(addressId));
  };

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
      <WrapRight>
        {address.default && (
          <DefaultSelection>{t('common:default')}</DefaultSelection>
        )}
        {isSelected && !isModal && (
          <EditRemoveButtonWrap>
            <EditButton>
              <ButtonText isEdit={true}>{t('profile:edit')}</ButtonText>
            </EditButton>
            <RemoveButton
              disabled
              onPress={() => handleRemoveAddress(address.id)}
            >
              <ButtonText>{t('cart:remove')}</ButtonText>
            </RemoveButton>
          </EditRemoveButtonWrap>
        )}
        {isModal && <RadioButton isChecked={isSelected ? true : false} />}
      </WrapRight>
    </SelectionWrap>
  );
};

const ButtonText = styled.Text<{ isEdit?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  color: ${({ isEdit, theme }) =>
    !isEdit ? theme.colors.primary : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.family.benton};
`;

const SelectionWrap = styled.TouchableOpacity<{ isSelected?: boolean }>`
  flex: 0.5;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 5px;
  border-width: 1px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
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
const EditRemoveButtonWrap = styled.View`
  justify-content: center;
  flex: 1;
`;
const ActionButtons = styled.TouchableOpacity`
  justify-content: center;
  padding: 10px 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  align-items: center;
`;

const EditButton = styled(ActionButtons)`
  background-color: ${({ theme }) => theme.colors.tertiary2};
`;
const RemoveButton = styled(ActionButtons)`
  border-color: ${({ theme }) => theme.colors.secondary};
  border-width: 1px;
`;

const DefaultSelection = styled.Text`
  text-align: center;
  margin: 5px 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  color: ${({ theme }) => theme.colors.secondary}; ;
`;

const RowIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
`;
