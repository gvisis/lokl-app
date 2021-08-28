import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ROUTES } from '../../routes/RouteNames';
import { EmptyView, ItemCard, SingleCompany } from '../../components';
import { CompanyProduct } from '../../state/app/AppInterfaces';

// eslint-disable-next-line react/display-name
export const CategoryView: React.FC = memo(() => {
  const [categoryItems, setCategoryItems] = useState([]);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { category, companyItem } = params;

  useEffect(() => {
    navigation.setOptions({ title: category.title });
    setCategoryItems(
      companyItem.produce.filter(
        (item: CompanyProduct) => item.category === category.id,
      ),
    );
  }, [category, companyItem]);

  return (
    <SingleCompany companyItem={companyItem} showRating={false}>
      <ScrollView>
        <CategorySection>
          {categoryItems.length === 0 ? (
            <EmptyView text="No items in this category" />
          ) : (
            categoryItems.map(item => (
              <ItemCard
                key={item.id}
                onPress={ROUTES.SingleProduct}
                productOwnerTitle={companyItem.title}
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
