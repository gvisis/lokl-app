import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import { InputContainer } from '../../components';
import { theme } from '../../assets/theme/default';

export const AuthContainer = ({ children, headerTitle }) => {
  const logoImg = require('../../assets/images/logoCat.png');
  return (
    <KeyboardAvoidsView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <ImageContainer>
            <LogoImage source={logoImg} resizeMode="contain" />
            <HeaderTitle>{headerTitle}</HeaderTitle>
          </ImageContainer>
          <InputContainer>{children}</InputContainer>
        </View>
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
  font-size: ${({ theme }) => theme.fonts.size.xxxl};
  letter-spacing: 1px;
  position: absolute;
  right: 30;
  text-transform: uppercase;
`;

const LogoImage = styled.Image`
  height: 100%;
  width: 100%;
`;
