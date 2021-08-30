import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ROUTES } from '../../routes/RouteNames';
import { EmptyView, ItemCard, SingleCompany } from '../../components';
import { CompanyProduct } from '../../state/app/AppInterfaces';
import {
  getCategoryItemsFromIds,
  getProductOwnerTitle,
} from '../../utils/functions';

// eslint-disable-next-line react/display-name
export const CategoriesView: React.FC = memo(() => {
  const [categoryItems, setCategoryItems] = useState([]);
  const { allCompanies } = useSelector(state => state.app);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { item } = params;

  useEffect(() => {
    navigation.setOptions({ title: item.title });
    const itemsForCategory = getCategoryItemsFromIds(allCompanies, item.id);
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
});

const CategorySection = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
