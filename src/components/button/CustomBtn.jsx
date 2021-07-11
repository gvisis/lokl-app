import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

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
    fontSize ? fontSize : theme.fonts.size.l}px;
  text-align: center;
  text-transform: ${({ textTransform }) => textTransform};
`;
export const CustomBtn = props => (
  <StyledButton {...props}>
    <StyledButtonText>{props.text}</StyledButtonText>
  </StyledButton>
);

StyledButton.defaultProps = {
  backgroundColor: `${({ theme }) => theme.colors.secondary}`,
};

StyledButtonText.propTypes = {
  textTransform: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  center: PropTypes.string,
  text: PropTypes.string.isRequired,
};

StyledButtonText.defaultProps = {
  textTransform: 'none',
};
