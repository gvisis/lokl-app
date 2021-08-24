import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, ProfileRow, ToggleSwitcher } from '../../components';

export const SettingsView: React.FC = () => (
  <Container>
    {/* make as a list later on */}
    <ProfileRow
      text="Change theme"
      rowLeft={<StyledIcon name={'paint-brush'} />}
      rowRight={<ToggleSwitcher toggle="themeSwitch" />}
    />
    <ProfileRow
      text="Change language"
      rowLeft={<StyledIcon name={'language'} />}
      rowRight={<ToggleSwitcher toggle="langSwitch" />}
    />
  </Container>
);

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.tertiary2};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
