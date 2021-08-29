import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import { Container, ProfileRow, ToggleSwitcher } from '../../components';

export const SettingsView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      {/* make as a list later on */}
      <SettingsWrap>
        <ProfileRow
          text={t('profile:changeTheme')}
          rowLeft={<StyledIcon name={'paint-brush'} />}
          rowRight={<ToggleSwitcher toggle="themeSwitch" />}
        />
        <ProfileRow
          text={t('profile:changeLang')}
          rowLeft={<StyledIcon name={'language'} />}
          rowRight={<ToggleSwitcher toggle="langSwitch" />}
        />
      </SettingsWrap>
    </Container>
  );
};

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.tertiary2};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
const SettingsWrap = styled.View`
  padding: 10px 15px;
`;
