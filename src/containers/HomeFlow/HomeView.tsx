import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import {
  Company,
  Container,
  EmptyView,
  HomeHeader,
  HomeRow,
  ProduceItem,
  Product,
  ScreenLoader,
} from '../../components';
import { actions } from '../../state/actions';

export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allCompanies = useSelector(state => state.app.allCompanies);
  const allCategories = useSelector(state => state.app.categories);
  const allProducts = useSelector(state => state.app.allProducts);
  const allAds = useSelector(state => state.app.allAppAds);

  useEffect(() => {
    // later add functionality to fetch everything with only one dispatch
    dispatch(actions.app.fetchCategories());
    dispatch(actions.app.fetchAllCompanies());
    dispatch(actions.app.fetchAllAds());
  }, [dispatch]);

  const renderAllAds = useCallback(
    ({ item }) => <ProduceItem width={200} item={item} ads />,
    [],
  );
  const renderAllCategories = ({ item }) => <ProduceItem item={item} />;
  const renderAllCompanies = ({ item }) => (
    <Company width={325} companyItem={item} />
  );
  const renderAllProducts = ({ item }) => (
    <Product width={325} allCompanies={allCompanies} item={item} height={200} />
  );

  return (
    <HomeContent>
      <HomeHeader title={t('home:title')} />
      {/* CATEGORIES ROW ( RENAME NEEDED ) */}
      <HomeRow title={t('home:rowProduce')}>
        {allCategories ? (
          <FlatList
            nestedScrollEnabled
            data={allCategories}
            renderItem={renderAllCategories}
            keyExtractor={item => item.id}
            horizontal
            ListEmptyComponent={<EmptyView />}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ScreenLoader color={'red'} size={50} />
        )}
      </HomeRow>
      {/* COMPANIES ROW */}
      <HomeRow title={t('home:rowCompany')}>
        {allCompanies ? (
          <FlatList
            data={allCompanies}
            renderItem={renderAllCompanies}
            keyExtractor={item => item.id}
            horizontal
            ListEmptyComponent={<EmptyView />}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ScreenLoader color={'red'} size={50} />
        )}
      </HomeRow>
      {/* PRODUCTS ROW */}
      <HomeRow title={t('home:rowProducts')}>
        {allProducts ? (
          <FlatList
            data={allProducts}
            renderItem={renderAllProducts}
            ListEmptyComponent={<EmptyView />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ScreenLoader color={'red'} size={50} />
        )}
      </HomeRow>
      {/* ADS ROW */}
      <HomeRow title={t('home:rowAds')}>
        {allAds ? (
          <FlatList
            data={allAds}
            renderItem={renderAllAds}
            keyExtractor={item => item.id}
            horizontal
            ListEmptyComponent={<EmptyView />}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ScreenLoader color={'red'} size={50} />
        )}
      </HomeRow>
    </HomeContent>
  );
};

const HomeContent = styled.ScrollView.attrs({ flex: 1 })`
  background-color: ${props => props.theme.colors.background};
`;
