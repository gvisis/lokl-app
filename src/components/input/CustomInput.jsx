import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  width: 90%;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ border }) =>
    border || '2px solid #ccc'}; //! add defaultprop later
`;

export const CustomInput = ({ placeholder, value, onChangeText, ...props }) => (
  <StyledInput
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
    {...props}
  />
);
