import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components';

import Logo from '../../assets/images/logo.svg';
import { Container, InputContainer } from '../../components';

export interface Container {
  headerTitle: string;
  children: React.ReactNode;
  onSubmit?: (email: string, password: string) => void;
}

export const AuthContainer: React.FC<Container> = ({
  children,
  headerTitle,
}) => {
  const theme = useTheme();
  const coverImage =
    'https://images.unsplash.com/photo-1524053821891-fadb2cc83d52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80';

  return (
    <Container>
      <HeaderContainer>
        <LinearGradient
          colors={[
            theme.colors.background5,
            theme.colors.background10,
            theme.colors.background,
          ]}
          locations={[0.3, 0.6, 0.85]}>
          <HeaderImage
            resizeMode="cover"
            source={{
              uri: coverImage,
            }}
          />
          <AppLogo width={120} height={160} fill={'red'} />
          <HeaderTitle>{headerTitle}</HeaderTitle>
        </LinearGradient>
      </HeaderContainer>
      <InputContainer>{children}</InputContainer>
    </Container>
  );
};

const HeaderContainer = styled.View`
  justify-content: center;
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.theme.colors.lightGrey2};
`;

const AppLogo = styled(Logo)`
  margin: 30px auto;
`;

const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secondary1};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 5px;
`;

const HeaderImage = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;
