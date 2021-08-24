import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

interface ProfileRowProps {
  onPress?: (e: GestureResponderEvent) => void;
  rowLeft?: React.ReactElement<any>;
  rowRight?: React.ReactElement<any>;
  text: string;
  label?: string;
  editable?: boolean;
  focused?: boolean;
}

export const ProfileRow: React.FC<ProfileRowProps> = ({
  onPress,
  rowLeft,
  rowRight,
  text,
  editable,
  focused,
  label,
}) => (
  <RowWrap label={label} onPress={onPress}>
    {rowLeft && <RowLeft>{rowLeft}</RowLeft>}
    {label && <RowLabel>{label}</RowLabel>}
    {editable ? (
      <EditableInput focused={focused} editable={editable}>
        {text}
      </EditableInput>
    ) : (
      <RowText>{text}</RowText>
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
  border-bottom-width: 1px;
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
  color: ${({ theme }) => theme.colors.lightGrey1};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
  position: absolute;
  top: 5px;
  left: 25px;
`;

const EditableInput = styled(RowText)`
  margin: 20px 20px 5px;
  padding-left: 10px;
  flex: 1;
  border-radius: ${({ theme }) => theme.border.radius5}px;
  border-color: ${({ theme, focused }: { focused: boolean }) =>
    focused ? theme.colors.secondary : theme.colors.lightGrey2};
`;

RowText.defaultProps = {
  editable: false,
};
