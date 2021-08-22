import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';
import { ItemCard, ScreenLoader, SingleCompany } from '../../components';
import { CompanyProduct } from '../../state/app/AppInterfaces';

type CompanyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
};

// eslint-disable-next-line react/display-name
export const CategoryView: React.FC<CompanyScreenProps> = memo(
  ({ navigation, route }) => {
    const [categoryItems, setCategoryItems] = useState([]);
    const { category, companyItem } = route.params;

    const handleSingleProductNav = (product: CompanyProduct) => {
      navigation.navigate(ROUTES.SingleProduct, {
        product,
        productOwnerTitle: companyItem.title,
      });
    };

    useEffect(() => {
      navigation.setOptions({ title: category.title });
      setCategoryItems(
        companyItem.produce.filter(item => item.category === category.id),
      );
    }, [category]);

    return (
      <SingleCompany companyItem={companyItem} showRating={false}>
        <ScrollView>
          <CategorySection>
            {categoryItems ? (
              categoryItems.map(item => (
                <ItemCard
                  key={item.id}
                  onPress={() => handleSingleProductNav(item)}
                  item={item}
                />
              ))
            ) : (
              <ScreenLoader color={'red'} size={50} />
            )}
            {categoryItems.length === 0 && (
              <NoItemsText>
                No items in this category. Check out other categories!
              </NoItemsText>
            )}
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

const NoItemsText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  margin-top: 30px;
  text-align: center;
  padding: 30px;
  width: 80%;
  color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.border.radius25}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;
