import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
import { AdsProps } from '../../state/app/AppInterfaces';

export const AdsView: React.FC = () => {
  const { t } = useTranslation();
  const adsFromState = useSelector(state => state.app.allAppAds);
  const { onSync } = useSelector(state => state.ui);
  const { navigate } = useNavigation();
  const handleCreateAd = useFunction(navigate, ROUTES.AddAd);

  interface RenderItemProps {
    item: AdsProps;
  }

  const renderItem = ({ item }: RenderItemProps) => (
    <ItemCard isAdsItem={true} onPress={ROUTES.SingleAdView} item={item} />
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
  flex: 0.7;
  padding-bottom: 25px;
`;
