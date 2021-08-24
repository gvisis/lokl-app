import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';
import { Container, CustomBtn } from '../../components';

export const ProfileView: React.FC = ({ navigation }) => {
  const { userInfo } = useSelector(state => state.user);

  const { t } = useTranslation();
  const handleProfileEditNav = useFunction(
    navigation.navigate,
    ROUTES.ProfileEdit,
  );
  const handleSettingsNav = useFunction(navigation.navigate, ROUTES.Settings);
  const dispatch = useDispatch();

  const handleLogout = useFunction(dispatch, actions.user.logout());
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
        <SingleRow onPress={handleProfileEditNav}>
          <RowText>Edit profile</RowText>
          <Icon name="chevron-right" size={30} color={'orange'} />
        </SingleRow>
        <SingleRow>
          <RowText>Payments</RowText>
          <Icon name="chevron-right" size={30} color={'orange'} />
        </SingleRow>
        <SingleRow>
          <RowText>Addresses</RowText>
          <Icon name="chevron-right" size={30} color={'orange'} />
        </SingleRow>
        <SingleRow onPress={handleSettingsNav}>
          <RowText>Settings</RowText>
          <Icon name="chevron-right" size={30} color={'orange'} />
        </SingleRow>

        <CustomBtn
          label={t('common:Logout')}
          onPress={handleLogout}
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
const SingleRow = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 10px 0;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
`;

const RowText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 1px;
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
  margin-bottom: 5px;
  letter-spacing: 1px;
`;

const ProfileEmail = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  letter-spacing: 1px;
`;
