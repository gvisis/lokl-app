import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { sortAsc } from '../../utils/functions';
import { Container, HomeHeader, HomeRow, ProduceItem } from '../../components';
import data from '../../assets/data';

export const HomeView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <HomeHeader title={'Find your produce'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeContent>
          <HomeRow title={'Produce'}>
            <FlatList
              data={data.produce.sort((a, b) => sortAsc(a.title, b.title))}
              renderItem={({ item }) => <ProduceItem item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HomeRow>
          <HomeRow title={'Companies'}>
            <FlatList
              data={data.companies.sort((a, b) => sortAsc(a.title, b.title))}
              renderItem={({ item }) => <ProduceItem size={250} item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HomeRow>
          <HomeRow title={'Popular Items'}>
            <FlatList
              data={data.popular.sort((a, b) => sortAsc(a.title, b.title))}
              renderItem={({ item }) => <ProduceItem size={300} item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HomeRow>
          <HomeRow title={'Ads'}>
            <FlatList
              data={data}
              renderItem={({ item }) => <ProduceItem size={250} item={item} />}
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
