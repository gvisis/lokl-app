import React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
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
  color: ${({ theme }) => theme.colors.error};
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

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  touched: boolean;
  secureTextEntry?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
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
