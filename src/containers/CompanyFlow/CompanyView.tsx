import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';

import { ROUTES } from '../../routes/RouteNames';
import { SingleCompany } from '../../components';

export const CompanyView: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const route = useRoute();

  const { companyItem } = route.params;
  const allCategories = useSelector(state => state.app.categories);
  const [compCategories, setCompCategories] = useState([]);
  const handleCategoryNav = useCallback(
    category => {
      navigate(ROUTES.CompanyCategory, { category, companyItem });
    },
    [navigate, companyItem],
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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <CompanyDescription>{companyItem.description}</CompanyDescription>
        {compCategories &&
          compCategories.map(category => (
            <CategoryCard
              onPress={() => handleCategoryNav(category)}
              key={category.id}
            >
              <ImageBackgrounds source={{ uri: category.image }} />
              <CategoryCardTitle>{category.title}</CategoryCardTitle>
            </CategoryCard>
          ))}
        <CompanyDetails>
          <CompanyDetailsTitle>{t('company:contactInfo')}</CompanyDetailsTitle>
          <CompanyDetailsInfoWrap>
            <View>
              {Object.entries(companyItem.address).map(([key, item]) => (
                <CompanyDetailsItem key={key}>
                  <CompanyDetailsItemTitle>
                    {t(`company:${key}`)}
                  </CompanyDetailsItemTitle>
                  <CompanyDetailsItemText>{item}</CompanyDetailsItemText>
                </CompanyDetailsItem>
              ))}
            </View>
            <View>
              <CompanyDetailsItem>
                <CompanyDetailsItemTitle>
                  {t('company:phone')}
                </CompanyDetailsItemTitle>
                <CompanyDetailsItemText>
                  {companyItem.phone}
                </CompanyDetailsItemText>
              </CompanyDetailsItem>
              <CompanyDetailsItem>
                <CompanyDetailsItemTitle>
                  {t('company:email')}
                </CompanyDetailsItemTitle>
                <CompanyDetailsItemText>
                  {companyItem.email}
                </CompanyDetailsItemText>
              </CompanyDetailsItem>
              <CompanyDetailsItem>
                <CompanyDetailsItemTitle>
                  {t('company:website')}
                </CompanyDetailsItemTitle>
                <CompanyDetailsItemText>
                  {companyItem.website}
                </CompanyDetailsItemText>
              </CompanyDetailsItem>
            </View>
          </CompanyDetailsInfoWrap>
        </CompanyDetails>
      </ScrollView>
    </SingleCompany>
  );
};
const CompanyDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.latoLight};
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.lightGrey1};
  margin-bottom: 10px;
`;
const ImageBackgrounds = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const CategoryCard = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.secondary};
  elevation: 2;
`;

const CategoryCardTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary + '90'};
  color: ${({ theme }) => theme.colors.white};
`;
const CompanyDetailsInfoWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const CompanyDetailsTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 10px;
`;

const CompanyDetails = styled.View`
  margin: 20px 0;
  padding: 0 20px;
`;

const CompanyDetailsItem = styled.View`
  margin-top: 10px;
`;

const CompanyDetailsItemTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  margin-bottom: 5px;
`;

const CompanyDetailsItemText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
