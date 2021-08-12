import React, { useEffect } from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

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
import { RootState } from '../../state/reducers';
import { useFunction } from '../../utils/hooks';

type AdsViewProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleProduct>;
  route: RouteProp<RootStackParamList, ROUTES.SingleProduct>;
};

export const AdsView: React.FC<AdsViewProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const adsFromState = useSelector((state: RootState) => state.app.allAppAds);
  const { onSync } = useSelector((state: RootState) => state.ui);

  const handleCreateAd = useFunction(navigation.navigate, ROUTES.AddAd);

  // First fetch all ads from server
  useEffect(() => {
    dispatch(actions.app.fetchAllAds());
  }, []);

  const renderItem = ({ item }) => {
    const adInfo = item[1];
    return <ItemCard title={adInfo.title} price={adInfo.price} />;
  };

  return (
    <Container>
      <HomeHeader title={'Ads View'} />
      <AdContainer>
        {adsFromState && (
          <FlatList
            numColumns={2}
            keyExtractor={item => item[1].id}
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
