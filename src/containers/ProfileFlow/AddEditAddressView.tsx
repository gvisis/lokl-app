import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Container, CustomBtn } from '../../components';
import { ProfileRow } from '../../components/profileRow/ProfileRow';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';

export const AddEditAddressView: React.FC = () => {
  const { userInfo } = useSelector(state => state.user);
  const { onSync } = useSelector(state => state.ui);
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialFormikValues = {
    name: userInfo.name,
    phone: userInfo.phone,
    street: '',
    city: '',
    postcode: '',
    country: 'Lithuania',
  };
  const handleAddNewAddress = useCallback(values => {
    dispatch(actions.user.addAddress(values));
    navigate(ROUTES.Address);
  }, []);

  return (
    <Container>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialFormikValues}
          onSubmit={values => handleAddNewAddress(values)}>
          {({ values, handleChange, handleSubmit }) => (
            <RowWraps>
              <ProfileRow
                editable
                label={t('profile:fullName')}
                onChangeText={handleChange('name')}
                placeholder={t('profile:namePlaceholder')}
                text={values.name}
              />
              <ProfileRow
                editable
                label={t('profile:phone')}
                onChangeText={handleChange('phone')}
                placeholder={'+370'}
                text={values.phone}
              />
              <ProfileRow
                editable
                label="Street"
                onChangeText={handleChange('street')}
                placeholder={t('profile:addressPlaceholder')}
                text={values.street}
              />
              <ProfileRow
                editable
                label={t('profile:city')}
                text={values.city}
                onChangeText={handleChange('city')}
              />
              <ProfileRow
                editable
                label={t('profile:postCode')}
                text={values.postcode}
                onChangeText={handleChange('postcode')}
              />
              <ProfileRow
                editable
                label={t('profile:country')}
                text={values.country}
              />
              <CustomBtn
                center
                secondary
                onSync={onSync.button}
                label={t('common:addNewAddress')}
                onPress={handleSubmit}
              />
            </RowWraps>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

const RowWraps = styled.View`
  flex: 0.5;
  margin-top: 10px;
  padding: 10px;
`;
