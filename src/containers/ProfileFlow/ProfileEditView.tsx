import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import { Container, CustomBtn, ProfileRow } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { ComponentNavProps } from '../../types/general';

export const ProfileEditView: React.FC<ComponentNavProps<ROUTES.ProfileEdit>> =
  () => {
    const { userInfo } = useSelector(state => state.user);
    const { onSync } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const handleUserUpdate = useCallback(
      updatedInfo => {
        dispatch(actions.user.updateUserInfo(updatedInfo));
      },
      [dispatch],
    );

    const initialFormikValues = {
      username: userInfo.username,
      phone: userInfo.phone,
      name: userInfo.name,
      email: userInfo.email,
    };

    return (
      <Container>
        <Formik
          initialValues={initialFormikValues}
          onSubmit={values => handleUserUpdate(values)}>
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <EditWrap>
              <ProfileRow
                label={'Username'}
                editable
                onBlur={handleBlur}
                onChangeText={handleChange('username')}
                placeholder={'Choose your username'}
                value={values.username}
              />
              <ProfileRow
                onBlur={handleBlur}
                editable
                label={'Full name'}
                onChangeText={handleChange('name')}
                placeholder={'Enter your name'}
                value={values.name}
              />
              <ProfileRow
                onBlur={handleBlur}
                editable
                label={'Email'}
                onChangeText={handleChange('email')}
                placeholder={'Enter your email'}
                value={values.email}
              />
              <ProfileRow
                onBlur={handleBlur}
                label={'Phone number'}
                editable
                onChangeText={handleChange('phone')}
                placeholder="(xxx) xxx-xxxx"
                value={values.phone}
              />
              <CustomBtn
                label={'Save'}
                center
                secondary
                onPress={handleSubmit}
                onSync={onSync.button}
              />
            </EditWrap>
          )}
        </Formik>
      </Container>
    );
  };
const EditWrap = styled.View`
  margin-top: 20px;
  padding: 0 10px;
`;
