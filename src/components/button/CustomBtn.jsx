import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {theme} from '../../assets/theme';

const {
  colors,
  fonts: {size},
} = theme;

const StyledButton = styled.TouchableOpacity`
  width: ${props => (props.width ? props.width : '90')}%;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor}
  align-items: center;
  padding: 10px;
  align-self: ${props => (props.center ? 'center' : 'flex-start')}
  margin-top: ${props => (props.marginTop ? props.marginTop : '15')}px;
`;
const StyledButtonText = styled.Text`
  color: ${props => props.color || colors.white};
  font-size: ${props => (props.fontSize ? props.fontSize : size.l)}px;
  text-align: center;
  text-transform: ${props => props.textTransform};
`;

export const CustomBtn = props => {
  return (
    <StyledButton {...props}>
      <StyledButtonText>{props.text}</StyledButtonText>
    </StyledButton>
  );
};

StyledButton.defaultProps = {
  backgroundColor: colors.secondary,
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
