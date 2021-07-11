import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: `${({ theme }) => theme.colors.secondary}`,
})`
  width: 90%;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CustomInput = ({ placeholder, value, onChangeText }) => (
  <StyledInput
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
  />
);
