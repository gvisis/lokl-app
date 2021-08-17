import React, { memo, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
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
    const { category, companyItem } = route.params;

    useEffect(() => {
      navigation.setOptions({ title: category.title });
    }, [category]);

    const emptyArray = new Array(8).fill(
      <ItemCard
        onPress={() => console.warn(category.title)}
        title={category.title}
        price={15}
      />,
    );

    return (
      <SingleCompany companyItem={companyItem} showRating={false}>
        <ScrollView>
          <CategorySection>{emptyArray.map(item => item)}</CategorySection>
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
