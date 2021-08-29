import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ROUTES } from 'src/routes/RouteNames';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  CART_ACTION,
  ComponentNavProps,
  ERROR_TYPE,
  ProductAddAction,
} from '../../types/general';
import { Container, CustomBtn } from '../../components';
import { actions } from '../../state/actions';
import { CompanyProduct } from '../../state/app/AppInterfaces';
import { calcRatingAverage } from '../../utils/functions';
import { api } from '../../api';
import { ItemHeader } from '../../components/headers/ItemHeader';

interface ProductViewProps extends ComponentNavProps<ROUTES.SingleProduct> {
  item?: CompanyProduct;
}

// eslint-disable-next-line react/display-name
export const ProductView: React.FC<ProductViewProps> = memo(
  ({ navigation, route }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [productTotalPrice, setProductTotalPrice] = useState(0);
    const { item, productOwnerTitle } = route.params;

    const { t } = useTranslation();
    const dispatch = useDispatch();

    // =========== BottomSheet config =================
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['0%', '40%'], []);

    const handleSheetChanges = useCallback(() => {
      setSelectedQuantity(0);
    }, []);

    const handleOpenSheet = () => bottomSheetRef.current.expand();

    const handleAddToCart = () => {
      if (selectedQuantity !== 0) {
        dispatch(actions.cart.checkCartActions('add', item, selectedQuantity));
        dispatch(
          actions.ui.setStatus(
            ERROR_TYPE.SUCCESS,
            true,
            t('cart:productAdded'),
          ),
        );
      }
      bottomSheetRef.current.close();
    };
    //==================================================

    const handleQuantityChange = useCallback(
      (actions: ProductAddAction) => {
        if (actions === CART_ACTION.INC && selectedQuantity < 10) {
          setSelectedQuantity(selectedQuantity + 1);
        }
        if (actions === CART_ACTION.DEC && selectedQuantity > 0) {
          setSelectedQuantity(selectedQuantity - 1);
        }
      },
      [selectedQuantity],
    );

    useEffect(() => {
      setProductTotalPrice(item.price * selectedQuantity);
    }, [selectedQuantity]);

    useEffect(() => {
      navigation.setOptions({ title: item.title });
    }, [item]);

    const handleRating = (userRating: number) => {
      const currentUserId = api.getUserInfo().uid;
      const newRatingObject = { id: currentUserId, rating: userRating };
      dispatch(actions.app.setProductRating(item, newRatingObject));
    };

    const ratingCustomImage = require('../../assets/images/ratingfull.png');
    return (
      <Container>
        <ItemHeader productOwnerTitle={productOwnerTitle} item={item} />
        <ItemMidSection>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ItemDescription>{item.description}</ItemDescription>
          </ScrollView>
        </ItemMidSection>
        <ItemFooter>
          <ItemRating>{t('common:rating')}</ItemRating>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={calcRatingAverage(item.ratings)}
            onFinishRating={handleRating}
            size={25}
            starImage={ratingCustomImage}
          />
        </ItemFooter>
        <AddWrap>
          <CustomBtn
            onPress={handleOpenSheet}
            center
            secondary
            label={t('cart:addToCart')}
          />
        </AddWrap>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          animateOnMount
          backdropComponent={BottomSheetBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <SheetWrap>
            <SheetTitle>{item.title}</SheetTitle>
            <SelectWrap>
              <SelectTitle>{t('cart:howMany')}</SelectTitle>
              <SelectOptionWrap>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(CART_ACTION.DEC)}>
                  <IncDecButton name="minus-circle" size={50} />
                </TouchableOpacity>
                <QuantityValue>{selectedQuantity}</QuantityValue>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(CART_ACTION.INC)}>
                  <IncDecButton name="plus-circle" size={50} />
                </TouchableOpacity>
              </SelectOptionWrap>
              <SelectTitle>
                {t('cart:total')}
                {productTotalPrice}
              </SelectTitle>
            </SelectWrap>
            <SheetFooter>
              <CustomBtn
                onPress={handleAddToCart}
                center
                secondary
                label={t('cart:addToCart')}
              />
            </SheetFooter>
          </SheetWrap>
        </BottomSheet>
      </Container>
    );
  },
);

const ItemMidSection = styled.View`
  flex: 2;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
`;

const ItemDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.latoLight};
  margin-bottom: 5px;
`;

const ItemFooter = styled.View`
  flex: 0.2;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.lightGrey2};
  padding: 10px 25px 0 0;
`;

const ItemRating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin-right: 10px;
`;

const AddWrap = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.lightGrey2};
  padding: 10px 10px 15px;
`;

const SheetWrap = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

const SheetTitle = styled.Text`
  padding: 10px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  color: ${({ theme }) => theme.colors.black};
`;

const SelectWrap = styled.View`
  flex: 1;
  padding: 5px;
  border-top-width: 3px;
  border-bottom-width: 3px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
`;
const SelectTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const SelectOptionWrap = styled.View`
  font-family: ${({ theme }) => theme.fonts.family.benton};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.black};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IncDecButton = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
`;
const QuantityValue = styled.Text`
  margin: 5px;
  padding: 5px;
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

const SheetFooter = styled.View`
  flex: 0.5;
`;
