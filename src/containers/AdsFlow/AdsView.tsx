import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import database from '@react-native-firebase/database';

import { actions } from '../../state/actions';
import { Container } from '../../components';
import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';
import { api } from '../../api';
import { getUserAds } from '../../state/user/UserActions';

type AdsViewProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleProduct>;
  route: RouteProp<RootStackParamList, ROUTES.SingleProduct>;
};

export const AdsView: React.FC<AdsViewProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [allAds, setAllAds] = React.useState(null);

  function createAd() {
    const adInfo = {
      id: Math.floor(Math.random() * 999999).toString(),
      title: 'naujas item',
      images: 'imgUri',
      category: 'baked',
      price: 32,
      description: 'aprasymas',
      dateRequired: new Date().toString(),
      dateAdded: new Date().toString(),
      owner: {
        id: api.getUserInfo().uid,
        name: 'gvidas',
        email: api.getUserInfo().email,
        city: 'vilnius',
      },
    };

    try {
      const newRef = database().ref('/ads').push();
      console.log('Auto generated key: ', newRef.key);
      newRef.set(adInfo).then(() => {
        console.log('updated', adInfo);
      });
    } catch (e) {
      console.log('huserinfocreate', e);
    }
  }
  async function getAllAds() {
    const adsRef = await database().ref(`/ads`);
    const adsData = await adsRef.once('value').then(snap => snap.val());
    setAllAds(adsData);
  }

  return (
    <Container>
      <Button
        title="your ads"
        onPress={() => getAllAds()}
        // onPress={() => dispatch(actions.user.getUserAds())}
      />
      <Text>AdsView</Text>
      <Button
        title="add ad"
        onPress={() => navigation.navigate(ROUTES.AddAd)}
      />
      <Button title="create ad" onPress={() => createAd()} />
      <AdContainer>
        {/* {console.log(Object.keys(allAds)).map(ad => (
          <Ad key={ad.id}>
            <AdTitle>{ad.title}</AdTitle>
            <AdPrice>{ad.price}</AdPrice>
            <AdDate>{ad.dateAdded}</AdDate>
          </Ad>
        ))} */}
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
