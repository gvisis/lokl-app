import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

const StyledButton = styled.TouchableOpacity`
  width: ${({ width }) => (width ? width : '90')}%;
  border-radius: 10px;
  background-color: ${({ secondary, theme }) =>
    !secondary ? theme.colors.secondary : theme.colors.secondaryBtn};
  align-items: center;
  padding: 10px;
  align-self: ${({ center }) => (center ? 'center' : 'flex-start')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '15')}px;
`;
const StyledButtonText = styled.Text`
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
  onPress: () => void;
  width?: number;
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

StyledButton.defaultProps = {
  backgroundColor: `${({ theme }) => theme.colors.secondary}`,
};

StyledButtonText.propTypes = {
  textTransform: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  center: PropTypes.string,
};

StyledButtonText.defaultProps = {
  textTransform: 'none',
};
