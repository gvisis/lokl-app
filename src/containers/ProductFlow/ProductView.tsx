import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Button, FlatList, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Container } from '../../components';
import data from '../../assets/data';

export const ProductView: React.FC = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { item: product } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: product.title });
  }, [product]);

  return (
    <Container>
      <ScrollView />
      <Text>{product.title}</Text>
    </Container>
  );
};
