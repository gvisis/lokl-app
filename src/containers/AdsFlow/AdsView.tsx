import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/core';

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
import { ComponentNavProps } from '../../types/general';

export const AdsView: React.FC<ComponentNavProps<ROUTES.SingleProduct>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const adsFromState = useSelector(state => state.app.allAppAds);
  const { onSync } = useSelector(state => state.ui);
  const handleCreateAd = useFunction(navigation.navigate, ROUTES.AddAd);

  const renderItem = ({ item }) => <ItemCard ads item={item} />;

  // Fetch all ads from server
  useFocusEffect(
    useCallback(() => {
      dispatch(actions.app.fetchAllAds());
    }, [dispatch]),
  );

  return (
    <Container>
      <HomeHeader title={'Ads View'} />
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
          <EmptyView text="No ads available" />
        )}
        {onSync.app && <ScreenLoader size={100} color={'red'} />}
      </AdContainer>
      <CustomBtn label="Create new ad" center onPress={handleCreateAd} />
    </Container>
  );
};

const AdContainer = styled.View`
  flex: 1;
  align-items: center;
`;
