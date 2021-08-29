import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { actions } from '../../state/actions';
import {
  Container,
  CustomBtn,
  EmptyView,
  HomeHeader,
  ItemCard,
  ScreenLoader,
} from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { useFunction } from '../../utils/hooks';

export const AdsView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const adsFromState = useSelector(state => state.app.allAppAds);
  const { onSync } = useSelector(state => state.ui);
  const { navigate } = useNavigation();
  const handleCreateAd = useFunction(navigate, ROUTES.AddAd);

  const renderItem = ({ item }) => (
    <ItemCard ads onPress={ROUTES.SingleAdView} item={item} />
  );

  // Fetch all ads from server
  useFocusEffect(
    useCallback(() => {
      dispatch(actions.app.fetchAllAds());
    }, []),
  );

  return (
    <Container>
      <HomeHeader title={t('ads:title')} />
      <AdContainer>
        {adsFromState.length !== 0 ? (
          <FlatList
            numColumns={2}
            keyExtractor={item => item.id}
            data={adsFromState}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyView />
        )}
        {onSync.app && <ScreenLoader size={100} color={'red'} />}
        <CustomBtn label={t('ads:createNew')} center onPress={handleCreateAd} />
      </AdContainer>
    </Container>
  );
};

const AdContainer = styled.View`
  flex: 1;
  padding-bottom: 25px;
`;
