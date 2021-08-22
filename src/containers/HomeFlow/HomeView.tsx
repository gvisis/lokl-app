import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { sortAsc } from '../../utils/functions';
import {
  Company,
  Container,
  HomeHeader,
  HomeRow,
  ProduceItem,
  Product,
  ScreenLoader,
} from '../../components';
import data from '../../assets/data';
import { actions } from '../../state/actions';

export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allCompanies = useSelector(state => state.app.allCompanies);
  const allCategories = useSelector(state => state.app.categories);
  const allProducts = useSelector(state => state.app.allProducts);

  useEffect(() => {
    // later add functionality to fetch everything with only one dispatch
    dispatch(actions.app.fetchAllCompanies());
    dispatch(actions.app.fetchCategories());
  }, []);
  return (
    <Container>
      <HomeHeader title={t('home:title')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeContent>
          {/* CATEGORIES ROW ( RENAME NEEDED ) */}
          <HomeRow title={t('home:row Produce')}>
            {allCategories ? (
              <FlatList
                data={allCategories}
                renderItem={({ item }) => <ProduceItem item={item} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <ScreenLoader color={'red'} size={50} />
            )}
          </HomeRow>
          {/* COMPANIES ROW */}
          <HomeRow title={t('home:row Company')}>
            {allCompanies ? (
              <FlatList
                data={allCompanies}
                renderItem={({ item }) => (
                  <Company width={325} companyItem={item} />
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <ScreenLoader color={'red'} size={50} />
            )}
          </HomeRow>
          {/* PRODUCTS ROW */}
          <HomeRow title={t('home:row Products')}>
            {allProducts ? (
              <FlatList
                data={allProducts}
                renderItem={({ item }) => (
                  <Product
                    width={325}
                    allCompanies={allCompanies}
                    product={item}
                    height={200}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <ScreenLoader color={'red'} size={50} />
            )}
          </HomeRow>
          {/* ADS ROW */}
          <HomeRow title={t('home:row Ads')}>
            <FlatList
              data={data.ads.sort((a, b) => sortAsc(a.title, b.title))}
              renderItem={({ item }) => <ProduceItem width={200} item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HomeRow>
        </HomeContent>
      </ScrollView>
    </Container>
  );
};

const HomeContent = styled.View`
  flex: 1;
  align-items: center;
`;
