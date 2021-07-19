import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';

import { InputContainer } from '../../components';

export const AuthContainer = ({ children, headerTitle }) => {
  const logoImg = require('../../assets/images/logoCat.png');
  return (
    <KeyboardAvoidsView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ImageContainer>
            <LogoImage source={logoImg} resizeMode="contain" />
            <HeaderTitle>{headerTitle}</HeaderTitle>
          </ImageContainer>
          <InputContainer>{children}</InputContainer>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidsView>
  );
};

const ImageContainer = styled.View`
  height: 35%;
  width: 100%;
`;
const KeyboardAvoidsView = styled.KeyboardAvoidingView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

const HeaderTitle = styled.Text`
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  letter-spacing: 1px;
  position: absolute;
  right: 30px;
  text-transform: uppercase;
`;

const LogoImage = styled.Image`
  height: 100%;
  width: 100%;
`;
