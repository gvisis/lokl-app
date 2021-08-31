import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import { ProfileRowProps } from '../../types/general';

export const ProfileRow: React.FC<ProfileRowProps> = ({
  onPress,
  rowLeft,
  rowRight,
  text,
  editable,
  label,
  placeholder,
  touchable,
  multiline,
  onChangeText,
  placeholderTextColor,
  ...props
}) => {
  const theme = useTheme();
  return (
    <RowWrap label={label} disabled={touchable} onPress={onPress}>
      {rowLeft && <RowLeft>{rowLeft}</RowLeft>}
      {label && editable && <RowLabel>{label}</RowLabel>}
      {editable ? (
        <EditableInput
          {...props}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : theme.colors.lightGrey
          }
          label={label}
          editable={editable}
          onChangeText={onChangeText}>
          {text}
        </EditableInput>
      ) : (
        <RowText>{text}</RowText>
      )}
      {rowRight && <RowRight>{rowRight}</RowRight>}
    </RowWrap>
  );
};

const RowLeft = styled.View`
  flex: 0.2;
  align-items: flex-start;
`;

const RowRight = styled.View`
  flex: 0.3;
  flex-grow: 0.5;
  align-items: flex-end;
`;

const RowWrap = styled.TouchableOpacity`
  width: 100%;
  min-height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  z-index: 1;
`;

const EditableInput = styled(RowText)`
  margin: ${({ label }) => (label ? '20px 20px 5px' : '5px')};
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  min-height: ${({ multiline }) => (multiline ? '80px' : 'auto')};
  max-height: ${({ multiline }) => (multiline ? '200px' : 'auto')};
  text-align-vertical: ${({ multiline }) => (multiline ? 'top' : 'center')};
  border-radius: ${({ theme }) => theme.border.radius5}px;
  elevation: 1;
`;

RowText.defaultProps = {
  editable: false,
};
