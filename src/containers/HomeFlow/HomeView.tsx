import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { RootState } from '../../state/reducers';
import {
  Container,
  CustomBtn,
  HomeHeader,
  HomeRow,
  ProduceItem,
} from '../../components';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'five Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'six Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'seven Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'eight Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'nine Item',
  },
];
export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = useFunction(dispatch, actions.user.logout());

  return (
    <Container>
      <HomeHeader title={'Find your produce'} />
      <ScrollView>
        <HomeContent>
          <HomeRow title={'Produce'}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ProduceItem itemTitle={item.title} />}
              keyExtractor={item => item.id}
              horizontal
            />
          </HomeRow>
          <HomeRow title={'Companies'}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ProduceItem itemTitle={item.title} />}
              keyExtractor={item => item.id}
              horizontal
            />
          </HomeRow>
          <HomeRow title={'Popular Items'}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ProduceItem itemTitle={item.title} />}
              keyExtractor={item => item.id}
              horizontal
            />
          </HomeRow>
          <HomeRow title={'Ads'}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ProduceItem itemTitle={item.title} />}
              keyExtractor={item => item.id}
              horizontal
            />
          </HomeRow>
        </HomeContent>
      </ScrollView>
      {/* <Produce /> */}
      {/* <Sellers /> */}
      {/* <PopularItems /> */}
      {/* <Ads /> */}

      <ButtonWrap>
        <CustomBtn
          label={t('common:Logout')}
          secondary
          center
          activeOpacity={0.5}
          onPress={handleLogout}
        />
      </ButtonWrap>
    </Container>
  );
};

const HomeContent = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
`;

const ButtonWrap = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.1;
`;
