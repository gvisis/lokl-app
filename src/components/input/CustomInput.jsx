import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: 'grey',
})`
  width: 90%;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  border-radius: 5px;
  background-color: white;
`;

export const CustomInput = ({...props}) => {
  return (
    <StyledInput
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
    />
  );
};
