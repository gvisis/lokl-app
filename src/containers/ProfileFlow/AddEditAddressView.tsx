import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Container, CustomBtn } from '../../components';
import { ProfileRow } from '../../components/rows/ProfileRow';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';
import { COUNTRY } from '../../utils/variables';
import { UserAddress } from '../../state/user/UserInterfaces';

interface EditView {
  params?: {
    addressId?: string;
  };
}

export const AddEditAddressView: React.FC = () => {
  const { userInfo } = useSelector(state => state.user);
  const { onSync } = useSelector(state => state.ui);
  const [initialFormikValues, setInitialFormikValues] = useState<UserAddress>({
    name: userInfo.name,
    phone: userInfo.phone,
    street: '',
    city: '',
    postcode: '',
    country: COUNTRY.LITHUANIA,
  });

  const route: EditView = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let addressId: string | undefined;

  if (route.params) {
    addressId = route.params.addressId;
  }

  useEffect(() => {
    if (addressId) {
      setInitialFormikValues({
        ...userInfo.address.find(
          singleAddress => singleAddress.id === addressId,
        ),
      });
      navigation.setOptions({ headerTitle: t('profile:editAddress') });
    }
  }, [addressId]);

  const handleAddressAction = useCallback(
    values => {
      if (addressId) {
        console.log('sitas', values);
        dispatch(actions.user.editAddress(addressId, values));
      } else {
        console.log('anas', values);
        dispatch(actions.user.addAddress(values));
      }
      navigation.navigate(ROUTES.Address);
    },
    [initialFormikValues],
  );

  return (
    <Container>
      <ContainerScroll>
        <Formik
          initialValues={initialFormikValues}
          enableReinitialize={true}
          onSubmit={values => handleAddressAction(values)}
        >
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
                onChangeText={handleChange('country')}
              />
              <CustomBtn
                center
                secondary
                onSync={onSync.button}
                label={
                  !addressId ? t('common:addNewAddress') : t('profile:save')
                }
                onPress={handleSubmit}
              />
            </RowWraps>
          )}
        </Formik>
      </ContainerScroll>
    </Container>
  );
};

const RowWraps = styled.View`
  flex: 0.5;
  margin-top: 10px;
  padding: 10px;
`;

const ContainerScroll = styled(ScrollView).attrs({
  flex: 1,
  showsVerticalScrollIndicator: false,
})``;
