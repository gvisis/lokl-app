import React, { memo, useCallback } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types/general';
import { ROUTES } from '../../routes/RouteNames';
import { SingleCompany } from '../../components';

type CompanyViewProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
  onPress?: (event: GestureResponderEvent) => void;
};

// eslint-disable-next-line react/display-name
export const CompanyView: React.FC<CompanyViewProps> = memo(
  ({ navigation, route }) => {
    const { company } = route.params;
    console.log(company);

    const handleCategoryNav = useCallback((category: string) => {
      navigation.navigate(ROUTES.CompanyCategory, { category, company });
    }, []);

    return (
      <SingleCompany company={company}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CompanyDescription>
            make it expandable with more text.. {company.description} pictures
            for the categories?
          </CompanyDescription>
          {company.categories.map((category, index) => (
            //! do not use index as a key!, it will be fixed later
            <CategoryCard
              onPress={() => handleCategoryNav(category)}
              key={index}>
              <CategoryCardTitle>{category}</CategoryCardTitle>
            </CategoryCard>
          ))}
        </ScrollView>
      </SingleCompany>
    );
  },
);

const CompanyDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.latoLight};
  padding: 10px;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const CategoryCard = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.secondary};
  elevation: 2;
`;

const CategoryCardTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
`;
