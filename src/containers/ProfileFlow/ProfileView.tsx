import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';
import { Container, CustomBtn, ProfileRow } from '../../components';
import { ComponentNavProps } from '../../types/general';

export const ProfileView: React.FC<ComponentNavProps<ROUTES.Profile>> = ({
  navigation,
}) => {
  const { userInfo } = useSelector(state => state.user);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleProfileEditNav = useFunction(
    navigation.navigate,
    ROUTES.ProfileEdit,
  );
  const handleSettingsNav = useFunction(navigation.navigate, ROUTES.Settings);
  const handleAddressNav = useFunction(navigation.navigate, ROUTES.Address);
  const handleLogout = useFunction(dispatch, actions.user.logout());

  const handleLogoutPress = useCallback(() => {
    Alert.alert(t('login:signout'), t('profile:logoutConfirm'), [
      {
        text: t('profile:cancel'),
        style: 'cancel',
      },
      { text: t('profile:confirm'), onPress: handleLogout },
    ]);
  }, []);

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage
          source={{ uri: 'http://dummyimage.com/356x218.png/cc0000/ffffff' }}
        />
        <ProfileName>{userInfo.name}</ProfileName>
        <ProfileEmail>{userInfo.email}</ProfileEmail>
      </ProfileHeader>
      <ProfileSection>
        <ProfileRow
          onPress={handleSettingsNav}
          text={t('profile:settings')}
          rowRight={
            <Icon
              name="chevron-right"
              size={30}
              color={theme.colors.secondaryBtn}
            />
          }
        />
        <ProfileRow
          onPress={handleProfileEditNav}
          text={t('profile:editProfile')}
          rowRight={
            <Icon
              name="chevron-right"
              size={30}
              color={theme.colors.secondaryBtn}
            />
          }
        />
        <ProfileRow
          onPress={handleAddressNav}
          text={t('profile:addresses')}
          rowRight={
            <Icon
              name="chevron-right"
              size={30}
              color={theme.colors.secondaryBtn}
            />
          }
        />
        <CustomBtn
          label={t('login:signout')}
          onPress={handleLogoutPress}
          center
          style={{ position: 'absolute', bottom: 25 }}
        />
      </ProfileSection>
    </Container>
  );
};

const ProfileHeader = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const ProfileSection = styled.View`
  flex: 1;
  justify-content: flex-start;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  padding: 20px 20px;
`;
const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 5px;
  border-color: white;
  margin: 10px;
`;

const ProfileName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 5px;
  letter-spacing: 1px;
`;

const ProfileEmail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  letter-spacing: 1px;
`;
