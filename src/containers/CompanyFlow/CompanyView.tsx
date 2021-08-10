import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from 'src/routes/RouteNames';
import { RootStackParamList } from 'src/routes/RootStackParamList';
import { AirbnbRating } from 'react-native-ratings';

import { Container } from '../../components';

type CompanyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
};

// eslint-disable-next-line react/display-name
export const CompanyView: React.FC<CompanyScreenProps> = memo(
  ({ navigation, route }) => {
    const { t } = useTranslation();
    const { company } = route.params;

    useEffect(() => {
      navigation.setOptions({ title: company.title });
    }, [company]);

    const ratingCustomImage = require('../../assets/images/ratingfull.png');

    return (
      <Container>
        <CompanyHeader>
          <TitleWrap>
            <CompanyImage source={{ uri: company.image }} />
            <CompanyTitleWrap>
              <CompanyTitle>{company.title}</CompanyTitle>
            </CompanyTitleWrap>
          </TitleWrap>
          <BottomHeader>
            <ItemRating>Rate:</ItemRating>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={company.rating}
              size={25}
              starImage={ratingCustomImage}
            />
          </BottomHeader>
        </CompanyHeader>
        <CompanyMidSection>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CompanyDescription>
              make it expandable with more text.. {company.description} pictures
              for the categories?
            </CompanyDescription>
            {company.categories.map((category, index) => (
              //! do not use index as a key!, it will be fixed later
              <CategoryCard key={index}>
                <CategoryCardTitle>{category}</CategoryCardTitle>
              </CategoryCard>
            ))}
          </ScrollView>
        </CompanyMidSection>
      </Container>
    );
  },
);

const CompanyHeader = styled.View`
  flex: 1.5;
  width: 100%;
  height: 100%;
`;
const CompanyImage = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TitleWrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CompanyTitleWrap = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.tertiary + 'D9'};
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: ${({ theme }) => theme.border.radius10}px;
`;

const CompanyTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;

const BottomHeader = styled.View`
  flex: 0.2;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  border-bottom-width: 1px;
  border-top-width: 1px;
`;
const CompanyMidSection = styled.View`
  flex: 3;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
`;

const CompanyDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.latoLight};
  padding: 10px;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const CategoryCard = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.secondary};
`;

const CategoryCardTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
`;

const ItemRating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin-right: 10px;
`;
