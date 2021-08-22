import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/core';

import { actions } from '../../state/actions';
import {
  Container,
  CustomBtn,
  HomeHeader,
  ItemCard,
  ScreenLoader,
} from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';
import { useFunction } from '../../utils/hooks';

type AdsViewProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleProduct>;
  route: RouteProp<RootStackParamList, ROUTES.SingleProduct>;
};

export const AdsView: React.FC<AdsViewProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const adsFromState = useSelector(state => state.app.allAppAds);
  const { onSync } = useSelector(state => state.ui);
  const handleCreateAd = useFunction(navigation.navigate, ROUTES.AddAd);

  const renderItem = ({ item }) => <ItemCard ads item={item} />;

  // Fetch all ads from server (create ads watcher later)
  useFocusEffect(
    useCallback(() => {
      dispatch(actions.app.fetchAllAds());
    }, []),
  );

  return (
    <Container>
      <HomeHeader title={'Ads View'} />
      <AdContainer>
        {adsFromState && (
          <FlatList
            numColumns={2}
            keyExtractor={item => item.id}
            data={adsFromState}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
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
