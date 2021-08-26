import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik';

import { Container, CustomBtn } from '../../components';
import { ProfileRow } from '../../components/profileRow/ProfileRow';
import { actions } from '../../state/actions';
import { ComponentNavProps } from '../../types/general';
import { ROUTES } from '../../routes/RouteNames';

export const AddEditAddressView: React.FC<
  ComponentNavProps<ROUTES.AddAddress>
> = ({ navigation }) => {
  const { userInfo } = useSelector(state => state.user);
  const { onSync } = useSelector(state => state.ui);
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
    navigation.goBack();
  }, []);

  return (
    <Container>
      <Formik
        initialValues={initialFormikValues}
        onSubmit={values => handleAddNewAddress(values)}>
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <RowWraps>
            <ProfileRow
              editable
              label="Full name"
              onChangeText={handleChange('name')}
              placeholder={'Your full name'}
              text={values.name}
            />
            <ProfileRow
              editable
              label="Phone number"
              onChangeText={handleChange('phone')}
              placeholder={'+370'}
              text={values.phone}
            />
            <ProfileRow
              editable
              label="Street"
              onChangeText={handleChange('street')}
              placeholder={'(include house/flat number)'}
              text={values.street}
            />
            <ProfileRow
              editable
              label="City"
              text={values.city}
              onChangeText={handleChange('city')}
            />
            <ProfileRow
              editable
              label="Post code"
              text={values.postcode}
              onChangeText={handleChange('postcode')}
            />
            <ProfileRow editable label="Country" text={values.country} />
            <CustomBtn
              center
              secondary
              onSync={onSync.button}
              label="Add new address"
              onPress={handleSubmit}
            />
          </RowWraps>
        )}
      </Formik>
    </Container>
  );
};

const RowWraps = styled.View`
  flex: 1;
  margin-top: 10px;
  padding: 10px;
`;
