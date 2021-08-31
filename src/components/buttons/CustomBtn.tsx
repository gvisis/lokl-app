import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';

interface StyledButtonProps {
  width?: number;
  secondary?: boolean;
  center?: boolean;
  fontSize?: number;
  marginTop?: number;

  textTransform?: string;
}
interface CustomBtnProps {
  label: string;
  onSync?: boolean;
  center?: boolean;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  width?: number;
  fontSize?: number;
  secondary?: boolean;
}

export const CustomBtn: React.FC<CustomBtnProps> = ({
  onSync,
  label,
  disabled,
  fontSize,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <StyledButton disabled={onSync || disabled} {...rest}>
      {onSync ? (
        <ActivityIndicator size={theme.fonts.size.l} color="#fff" />
      ) : (
        <StyledButtonText fontSize={fontSize}>{label}</StyledButtonText>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  width: ${({ width }) => (width ? width : '90')}%;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background-color: ${({ secondary, theme }) =>
    !secondary ? theme.colors.secondary : theme.colors.tertiary};
  align-items: center;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  align-self: ${({ center }) => (center ? 'center' : 'flex-start')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '15')}px;
`;
const StyledButtonText = styled.Text<StyledButtonProps>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? fontSize : theme.fonts.size.l}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  text-transform: ${({ textTransform }) => textTransform};
`;

StyledButtonText.defaultProps = {
  textTransform: 'none',
};
