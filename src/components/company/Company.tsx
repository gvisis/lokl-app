import React, { useCallback } from 'react';
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';

import { ROUTES } from '../../routes/RouteNames';
import { Category, CompanyProps } from '../../state/app/AppInterfaces';
import { calcRatingAverage } from '../../utils/functions';

export interface CompanyItemProps {
  companyItem: CompanyProps;
  width?: number;
  height?: number;
  category?: Category;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Company: React.FC<CompanyItemProps> = ({
  companyItem,
  width,
  height,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const ratingCustomImage = require('../../assets/images/ratingfull.png');

  const handleSingleProductNav = useCallback(() => {
    navigation.navigate(ROUTES.SingleCompany, { companyItem });
  }, []);

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          theme.colors.primary3,
          false,
        )}
        useForeground={true}
        onPress={handleSingleProductNav}>
        <ProductWrap width={width} height={height}>
          <CompanyLeft>
            <CompanyImage
              resizeMode="cover"
              source={{ uri: companyItem.image }}
            />
          </CompanyLeft>
          <CompanyRight>
            <CompanyName>{companyItem.title}</CompanyName>
            <CompanyDescription>{companyItem.description}</CompanyDescription>
            <CompanyRating>
              <AirbnbRating
                count={5}
                showRating={false}
                isDisabled={true}
                defaultRating={calcRatingAverage(companyItem.ratings)}
                size={15}
                selectedColor={theme.colors.red}
                unSelectedColor={theme.colors.red1}
                starImage={ratingCustomImage}
              />
            </CompanyRating>
          </CompanyRight>
        </ProductWrap>
      </TouchableNativeFeedback>
    );
  }
};

const ProductWrap = styled.View`
  margin: 10px;
  width: ${(props: CompanyItemProps) => props.width}px;
  height: ${(props: CompanyItemProps) => props.height}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
  background: ${({ theme }) => theme.colors.primary1};
  overflow: hidden;
  elevation: 3;
`;

const CompanyLeft = styled.View`
  flex: 0.6;
  height: 100%;
`;
const CompanyImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const CompanyRight = styled.View`
  flex: 1;
  height: 100%;
  padding: 5px;
  justify-content: space-between;
`;

const CompanyName = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  color: ${({ theme }) => theme.colors.secondary};
`;

const CompanyDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
`;

const CompanyRating = styled.View`
  width: 100%;
  align-items: flex-start;
`;

ProductWrap.defaultProps = {
  height: 120,
};
