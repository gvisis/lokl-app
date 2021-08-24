import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { actions } from '../../state/actions';
import { Container, CustomBtn, ProfileRow } from '../../components';

export const ProfileEditView = () => {
  const { userInfo } = useSelector(state => state.user);
  const { onSync } = useSelector(state => state.ui);

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
    <Container>
      <EditWrap>
        <ProfileRow label={'Full name'} editable text={userInfo.name} />
        <ProfileRow label={'City'} editable text={userInfo.city} />
        <ProfileRow label={'Email'} editable text={userInfo.email} />
      </EditWrap>

      <CustomBtn
        label={'Update info'}
        secondary
        center
        onPress={updateUserInfo}
        onSync={onSync.button}
      />
    </Container>
  );
};
const EditWrap = styled.View`
  margin-top: 20px;
  padding: 0 10px;
`;
