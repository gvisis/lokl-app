import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';
import { Container } from '..';
import { CompanyProps } from '../../state/app/AppInterfaces';
import { api } from '../../api';
import { actions } from '../../state/actions';
import { calcRatingAverage } from '../../utils/functions';

interface SingleCompanyProps {
  companyItem: CompanyProps;
  navigation?: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route?: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
  children?: React.ReactNode;
  showRating?: boolean;
}

export const SingleCompany: React.FC<SingleCompanyProps> = ({
  companyItem,
  children,
  showRating,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: companyItem.title });
  }, [companyItem]);
  const ratingCustomImage = require('../../assets/images/ratingfull.png');

  const handleRating = (userRating: number) => {
    const currentUserId = api.getUserInfo().uid;
    const newRatingObject = { id: currentUserId, rating: userRating };
    dispatch(actions.app.setCompanyRating(companyItem.id, newRatingObject));
  };
  return (
    <Container>
      <CompanyHeader>
        <TitleWrap>
          <CompanyImage source={{ uri: companyItem.image }} />
          <CompanyTitleWrap>
            <CompanyTitle>{companyItem.title} (info?) </CompanyTitle>
          </CompanyTitleWrap>
        </TitleWrap>
        {showRating && (
          <BottomHeader>
            <ItemRating>Rating:</ItemRating>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={calcRatingAverage(companyItem.ratings)}
              onFinishRating={handleRating}
              size={25}
              starImage={ratingCustomImage}
            />
          </BottomHeader>
        )}
      </CompanyHeader>
      <CompanyMidSection>{children}</CompanyMidSection>
    </Container>
  );
};

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
  background: ${({ theme }) => theme.colors.background};
`;

const ItemRating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin-right: 10px;
`;

SingleCompany.defaultProps = {
  showRating: true,
};
