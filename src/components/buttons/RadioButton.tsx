import React from 'react';
import styled from 'styled-components/native';

interface RadioButtonProps {
  isChecked?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ isChecked }) => (
  <RadioWrap>
    <RadioInside isChecked={isChecked} />
  </RadioWrap>
);

const RadioWrap = styled.TouchableOpacity`
  border-radius: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

const RadioInside = styled.View<RadioButtonProps>`
  width: 12px;
  height: 12px;
  border-radius: 8px;
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.secondary : theme.colors.transparent};
`;
