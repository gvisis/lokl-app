import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

interface StyledButtonProps {
  width?: number;
  secondary?: boolean;
  center?: boolean;
  fontSize?: number;
  marginTop?: number;
  textTransform?: string;
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  width: ${({ width }) => (width ? width : '90')}%;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background-color: ${({ secondary, theme }) =>
    !secondary ? theme.colors.secondary : theme.colors.tertiary};
  align-items: center;
  padding: 10px;
  align-self: ${({ center }) => (center ? 'center' : 'flex-start')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '15')}px;
`;
const StyledButtonText = styled.Text<StyledButtonProps>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? fontSize : theme.fonts.size.xl}px;
  text-align: center;
  text-transform: ${({ textTransform }) => textTransform};
`;

interface CustomBtnProps {
  label: string;
  onSync?: boolean;
  center?: boolean;
  activeOpacity?: number;
  onPress?: () => void;
  width?: number;
  secondary?: boolean;
}

export const CustomBtn: React.FC<CustomBtnProps> = ({
  onSync,
  label,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledButton disabled={onSync} {...rest}>
      {onSync ? (
        <ActivityIndicator size={theme.fonts.size.xxxl} color="#fff" />
      ) : (
        <StyledButtonText>{label}</StyledButtonText>
      )}
    </StyledButton>
  );
};

StyledButtonText.defaultProps = {
  textTransform: 'none',
};
