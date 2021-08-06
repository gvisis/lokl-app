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
import data from '../../assets/data';

export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = useFunction(dispatch, actions.user.logout());

  return (
    <Container>
      <HomeHeader title={'Find your produce'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeContent>
          <HomeRow title={'Produce'}>
            <FlatList
              data={data}
              renderItem={({ item }) => <ProduceItem item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HomeRow>
          <HomeRow title={'Companies'} />
          <HomeRow title={'Popular Items'} />
          <HomeRow title={'Ads'} />
        </HomeContent>
      </ScrollView>
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
`;

const ButtonWrap = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.1;
`;
