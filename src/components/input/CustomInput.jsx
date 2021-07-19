import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  width: 100%;
  padding: 5px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ErrorMessage = styled.Text`
  color: #fe0000;
  padding: 5px 0;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
const InputWrapper = styled.View`
  width: 90%;
  justify-content: center;
  margin-top: 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  ...props
}) => (
  <InputWrapper>
    {error && touched && <ErrorMessage>{error}</ErrorMessage>}
    <StyledInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...props}
    />
  </InputWrapper>
);
