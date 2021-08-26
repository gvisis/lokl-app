import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { ComponentNavProps } from '../../types/general';
import { ROUTES } from '../../routes/RouteNames';
import { SingleCompany } from '../../components';

export const CompanyView: React.FC<ComponentNavProps<ROUTES.SingleCompany>> =
  // eslint-disable-next-line react/display-name
  memo(({ navigation, route }) => {
    const { companyItem } = route.params;
    const allCategories = useSelector(state => state.app.categories);
    const [CompCategories, setCompCategories] = useState([]);

    const handleCategoryNav = useCallback(
      category => {
        navigation.navigate(ROUTES.CompanyCategory, { category, companyItem });
      },
      [navigation, companyItem],
    );

    useEffect(() => {
      setCompCategories(
        allCategories.filter(category =>
          companyItem.categories.includes(category.id),
        ),
      );
    }, [allCategories]);

    return (
      <SingleCompany companyItem={companyItem}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CompanyDescription>
            make it expandable with more text.. {companyItem.description}{' '}
            pictures for the categories?
          </CompanyDescription>
          {CompCategories &&
            CompCategories.map(category => (
              <CategoryCard
                onPress={() => handleCategoryNav(category)}
                key={category.id}>
                <CategoryCardTitle>{category.title}</CategoryCardTitle>
              </CategoryCard>
            ))}
        </ScrollView>
      </SingleCompany>
    );
  });

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
