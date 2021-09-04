import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ROUTES } from '../../routes/RouteNames';
import { EmptyView, ItemCard, SingleCompany } from '../../components';
import {
  getCategoryItemsFromIds,
  getProductOwnerTitle,
} from '../../utils/functions';
import { CompanyProps } from '../../state/app/AppInterfaces';

interface CategoryParamProps {
  item?: CompanyProps;
}

export const CategoriesView: React.FC = () => {
  ``;
  const [categoryItems, setCategoryItems] = useState([]);
  const { allCompanies } = useSelector(state => state.app);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { item }: CategoryParamProps = params;

  useEffect(() => {
    navigation.setOptions({ title: item.title });
    const itemsForCategory = allCompanies
      ? getCategoryItemsFromIds(allCompanies, item.id)
      : [];
    setCategoryItems(itemsForCategory);
  }, [item, allCompanies]);

  return (
    <SingleCompany companyItem={item} showRating={false}>
      <ScrollView>
        <CategorySection>
          {categoryItems.length === 0 ? (
            <EmptyView text={t('category:empty')} />
          ) : (
            categoryItems.map(item => (
              <ItemCard
                key={item.id}
                productOwnerTitle={getProductOwnerTitle(allCompanies, item)}
                onPress={ROUTES.SingleProduct}
                item={item}
              />
            ))
          )}
        </CategorySection>
      </ScrollView>
    </SingleCompany>
  );
};

const CategorySection = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
