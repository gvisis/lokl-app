import React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 15px;
`;
const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  padding: 5px 0;
  font-size: ${({ theme }) => theme.fonts.size.s}px;
`;
const InputWrapper = styled.View`
  width: 90%;
  flex-direction: row;
`;
const IconWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.lightGrey2};
  border-top-left-radius: 0;
  border-bottom-left-radius: 10px;
  border-color: ${({ theme }) => theme.colors.lightGrey2};
  justify-content: center;
  align-items: center;
  width: 15%;
`;
const StyledInput = styled.TextInput`
  width: 85%;
  padding: 8px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  border-color: ${({ theme }) => theme.colors.lightGrey2};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 10px;
  border-left-width: 0;
`;

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  touched: boolean;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  secureTextEntry?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  iconName,
  iconSize,
  iconColor,
  ...props
}) => {
  const theme = React.useContext(ThemeContext);
  return (
    <InputContainer>
      {error && touched && <ErrorMessage>{error}</ErrorMessage>}
      <InputWrapper>
        <IconWrapper>
          <Icon
            name={iconName}
            size={iconSize || 20}
            color={iconColor || theme.colors.tertiary2}
          />
        </IconWrapper>
        <StyledInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          {...props}
        />
      </InputWrapper>
    </InputContainer>
  );
};
