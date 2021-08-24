import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

interface ProfileRowProps {
  onPress?: (e: GestureResponderEvent) => void;
  rowLeft?: React.ReactElement<any>;
  rowRight?: React.ReactElement<any>;
  text?: string;
  value?: string | number;
  label?: string;
  editable?: boolean;
  placeholder?: string;
}

export const ProfileRow: React.FC<ProfileRowProps> = ({
  onPress,
  rowLeft,
  rowRight,
  text,
  value,
  editable,
  label,
  placeholder,
  onChangeText,
}) => (
  <RowWrap label={label} onPress={onPress}>
    {rowLeft && <RowLeft>{rowLeft}</RowLeft>}
    {label && editable && <RowLabel>{label}</RowLabel>}
    {editable ? (
      <EditableInput
        placeholder={placeholder}
        placeholderTextColor="#e9e9e9"
        editable={editable}
        onChangeText={onChangeText}>
        {text || value}
      </EditableInput>
    ) : (
      <RowText>{text || value}</RowText>
    )}
    {rowRight && <RowRight>{rowRight}</RowRight>}
  </RowWrap>
);

const RowLeft = styled.View`
  flex: 0.1;
  align-items: center;
  align-items: flex-start;
`;

const RowRight = styled.View`
  flex: 0.3;
  align-items: flex-end;
`;

const RowWrap = styled.TouchableOpacity`
  width: 100%;
  min-height: 50px;
  max-height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 2px;
  padding: 0 10px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
`;

const RowText = styled.TextInput`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
  flex: 0.8;
`;

const RowLabel = styled.Text`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 1;
`;

const EditableInput = styled(RowText)`
  margin: 20px 20px 5px;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  border-radius: ${({ theme }) => theme.border.radius5}px;
  elevation: 1;
`;

RowText.defaultProps = {
  editable: false,
};
