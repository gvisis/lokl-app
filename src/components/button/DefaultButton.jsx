import React from 'react';
import styled from 'styled-components/native';

const Buttonas = styled.TouchableOpacity`
  width: 90%;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor || 'yellow'}
  align-items: center;
  padding: 10px;
`;
const ButtonText = styled.Text`
  color: ${props => props.color || 'white'};
  font-size: 20px;
  text-align: center;
`;

export const CustomBtn = props => {
  console.log(props.backgroundColor);
  return (
    <Buttonas {...props}>
      <ButtonText>{props.text}</ButtonText>
    </Buttonas>
  );
};
