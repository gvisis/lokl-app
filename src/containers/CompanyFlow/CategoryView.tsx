import React, { memo, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from 'src/routes/RouteNames';

import { RootStackParamList } from '../../types/general';
import { ItemCard, SingleCompany } from '../../components';

type CompanyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
};

// eslint-disable-next-line react/display-name
export const CategoryView: React.FC<CompanyScreenProps> = memo(
  ({ navigation, route }) => {
    const { category, company } = route.params;

    useEffect(() => {
      navigation.setOptions({ title: category });
    }, [category]);

    return (
      <SingleCompany company={company} showRating={false}>
        <ScrollView>
          <CategorySection>
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
            <ItemCard
              onPress={() => console.warn(category)}
              title={category}
              price={15}
            />
          </CategorySection>
        </ScrollView>
      </SingleCompany>
    );
  },
);
const CategorySection = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
