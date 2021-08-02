import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { actions } from '../../state/actions';
import { CustomBtn } from '../../components';
import { RootState } from '../../state/reducers';

export const ProfileEditView = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { onSync } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const updateUserInfo = useCallback(() => {
    const updatedInfo = {
      age: 40,
    };
    dispatch(actions.user.updateUserInfo(updatedInfo));
  }, []);

  useEffect(() => {
    dispatch(actions.ui.setOnSync('button', false));
  }, [userInfo.age]);

  return (
    <HomeWrap>
      <WelcomeTitle>Profile EDIT view!</WelcomeTitle>
      <View>
        <Text>Name: {userInfo.name}</Text>
        <Text>Age: {userInfo.age}</Text>
        <Text>City: {userInfo.city}</Text>
        <Text>Email: {userInfo.email}</Text>
      </View>

      <CustomBtn
        label={'Update info'}
        secondary
        center
        onPress={updateUserInfo}
        onSync={onSync.button}
      />
    </HomeWrap>
  );
};

const HomeWrap = styled.View`
  flex: 1;
`;

const WelcomeTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  text-align: center;
  padding: 10px;
  flex: 4;
`;
