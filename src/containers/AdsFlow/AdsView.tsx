import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

import { actions } from '../../state/actions';
import { Container } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';

type AdsViewProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleProduct>;
  route: RouteProp<RootStackParamList, ROUTES.SingleProduct>;
};

export const AdsView: React.FC<AdsViewProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Button
        title="your ads"
        onPress={() => dispatch(actions.user.getUserAds())}
      />
      <Text>AdsView</Text>
      <Button
        title="add ad"
        onPress={() => navigation.navigate(ROUTES.AddAd)}
      />
      <AdContainer>
        <Ad>
          <AdTitle>Title</AdTitle>
          <AdPrice>43</AdPrice>
          <AdDate>2020-08-10</AdDate>
        </Ad>
      </AdContainer>
    </Container>
  );
};

const AdContainer = styled.View`
  flex: 0.5;
  background: red;
  flex-direction: row;
`;

const Ad = styled.TouchableOpacity`
  background: chartreuse;
  flex: 0.3;
  margin: 10px;
`;

const AdTitle = styled.Text`
  font-size: 20px;
  color: black;
`;

const AdDate = styled.Text`
  font-size: 20px;
  color: white;
`;

const AdPrice = styled.Text`
  font-size: 20px;
  color: white;
`;
