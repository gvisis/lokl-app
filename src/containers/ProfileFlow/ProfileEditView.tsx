import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { actions } from '../../state/actions';
import { Container, CustomBtn, ProfileRow } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { ComponentNavProps } from '../../types/general';

export const ProfileEditView: React.FC<ComponentNavProps<ROUTES.ProfileEdit>> =
  ({ navigation }) => {
    const { userInfo } = useSelector(state => state.user);
    const { onSync } = useSelector(state => state.ui);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleUserUpdate = useCallback(
      updatedInfo => {
        dispatch(actions.user.updateUserInfo(updatedInfo));
        navigation.goBack();
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
                label={t('profile:username')}
                editable
                onBlur={handleBlur}
                onChangeText={handleChange('username')}
                placeholder={t('profile:usernamePlaceholder')}
                text={values.username}
              />
              <ProfileRow
                onBlur={handleBlur}
                editable
                label={t('profile:fullName')}
                onChangeText={handleChange('name')}
                placeholder={t('profile:namePlaceholder')}
                text={values.name}
              />
              <ProfileRow
                onBlur={handleBlur}
                editable
                label={t('common:email')}
                onChangeText={handleChange('email')}
                placeholder={t('profile:emailPlaceholder')}
                text={values.email}
              />
              <ProfileRow
                onBlur={handleBlur}
                label={t('profile:phone')}
                editable
                onChangeText={handleChange('phone')}
                placeholder={'+370'}
                text={values.phone}
              />
              <CustomBtn
                label={t('profile:save')}
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
