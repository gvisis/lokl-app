import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../../assets/theme/default';

const {
  colors,
  fonts: { size },
} = theme;

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGrey,
})`
  width: 90%;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  color: ${colors.black};
  font-size: ${size.xl};
  border-radius: 5px;
  background-color: ${colors.white};
`;

export const CustomInput = ({ ...props }) => {
  const { placeholder, value, onChangeText } = props;
  return (
    <StyledInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};
