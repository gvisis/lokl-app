import React, { useCallback } from 'react';
import { Alert, GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { UserAddress } from '../../../state/user/UserInterfaces';
import { actions } from '../../../state/actions';
import { ROUTES } from '../../../routes/RouteNames';
import { ADDRESS_ICONS } from '../../../utils/variables';
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
  const { navigate } = useNavigation();

  const handleRemoveAddress = useCallback(addressId => {
    Alert.alert(t('cart:remove'), t('profile:addressRemoveConfirm'), [
      {
        text: t('profile:cancel'),
        style: 'cancel',
      },
      {
        text: t('profile:confirm'),
        onPress: () => dispatch(actions.user.removeAddress(addressId)),
      },
    ]);
  }, []);

  //
  const handleEditAddress = (addressId: string) => {
    navigate(ROUTES.AddAddress, { addressId });
  };

  const isSelected = address.id === selectedId;

  return (
    <SelectionWrap onPress={onPress} isSelected={isSelected} {...props}>
      <WrapLeft>
        <FullName>{address.name}</FullName>
        <RowWrap>
          <RowIcon name={ADDRESS_ICONS.PHONE} />
          <RowLine>{address.phone}</RowLine>
        </RowWrap>
        <RowWrap>
          <RowIcon name={ADDRESS_ICONS.STREET} />
          <RowLine>
            {address.street}, {address.postcode}
          </RowLine>
        </RowWrap>
        <RowWrap>
          <RowIcon name={ADDRESS_ICONS.ADDRESS} />
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
            <EditButton onPress={() => handleEditAddress(address.id)}>
              <ButtonText isEdit={true}>{t('profile:edit')}</ButtonText>
            </EditButton>
            <RemoveButton onPress={() => handleRemoveAddress(address.id)}>
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
  flex: 1;
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
  color: ${({ theme }) => theme.colors.secondary};
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
  color: ${({ theme }) => theme.colors.textPrimary};
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

const RowIcon = styled(Icon).attrs({ size: ADDRESS_ICONS.SIZE_SM })`
  color: ${({ theme }) => theme.colors.primary};
`;
