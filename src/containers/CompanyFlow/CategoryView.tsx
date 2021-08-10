import React, { memo, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from 'src/routes/RouteNames';
import { RootStackParamList } from 'src/routes/RootStackParamList';

import { SingleCompany } from '../../components';

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
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
            <ItemCard onPress={() => console.warn(category)}>
              <ItemFooter>
                <ItemCardTitle>{category}</ItemCardTitle>
                <ItemPrice>$15</ItemPrice>
              </ItemFooter>
            </ItemCard>
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

const ItemCard = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width / 2.5}px;
  height: ${Dimensions.get('window').height / 5}px;
  justify-content: flex-end;
  border-width: 1px;
  margin: 15px 10px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;
const ItemFooter = styled.View`
  flex-direction: row;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  justify-content: space-around;
  padding: 5px;
`;

const itemTitleStyle = css`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.white};
`;
const ItemCardTitle = styled.Text`
  ${itemTitleStyle}
`;
const ItemPrice = styled.Text`
  ${itemTitleStyle}
`;
