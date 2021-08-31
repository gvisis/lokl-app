import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Company,
  EmptyView,
  HomeHeader,
  HomeRow,
  ProduceItem,
  Product,
  ScreenLoader,
} from '../../components';
import { actions } from '../../state/actions';
import { ROUTES } from '../../routes/RouteNames';
import {
  Category,
  CompanyProduct,
  CompanyProps,
} from '../../state/app/AppInterfaces';

export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allCompanies, categories, allProducts, allAppAds } = useSelector(
    state => state.app,
  );

  useEffect(() => {
    dispatch(actions.app.fetchCategories());
  }, [dispatch]);

  const renderAllAds = useCallback(
    ({ item }) => (
      <ProduceItem
        width={200}
        item={item}
        onPress={ROUTES.SingleAdView}
        isAdItem={true}
      />
    ),
    [],
  );
  const renderAllCategories = ({ item }: { item: Category }) => (
    <ProduceItem onPress={ROUTES.SingleCategory} item={item} />
  );
  const renderAllCompanies = ({ item }: { item: CompanyProps }) => (
    <Company width={325} companyItem={item} />
  );
  const renderAllProducts = ({ item }: { item: CompanyProduct }) => (
    <Product width={325} allCompanies={allCompanies} item={item} height={200} />
  );

  return (
    <>
      <HomeContent keyboardShouldPersistTaps="always">
        <HomeHeader title={t('home:title')} />
        {/* CATEGORIES ROW */}
        <HomeRow title={t('home:rowProduce')}>
          {categories ? (
            <FlatList
              nestedScrollEnabled
              data={categories}
              renderItem={renderAllCategories}
              keyExtractor={item => item.id.toString()}
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
          {allAppAds ? (
            <FlatList
              data={allAppAds}
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
    </>
  );
};

const HomeContent = styled.ScrollView.attrs({ flex: 1 })`
  background-color: ${props => props.theme.colors.background};
`;
