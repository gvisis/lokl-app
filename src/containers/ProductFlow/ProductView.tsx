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

import { ComponentNavProps } from '../../types/general';
import { Container } from '../../components';
import { actions } from '../../state/actions';
import { CompanyProduct } from '../../state/app/AppInterfaces';

interface ProductViewProps extends ComponentNavProps<ROUTES.SingleProduct> {
  item?: CompanyProduct;
}

// eslint-disable-next-line react/display-name
export const ProductView: React.FC<ProductViewProps> = memo(
  ({ navigation, route }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [productTotalPrice, setProductTotalPrice] = useState(0);
    const { product, productOwnerTitle } = route.params;

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
        dispatch(
          actions.cart.checkCartActions('add', product, selectedQuantity),
        );
        dispatch(
          actions.ui.setStatus('success', true, 'Product added to cart'),
        );
      }
      bottomSheetRef.current.close();
    };
    //==================================================

    useEffect(() => {
      setProductTotalPrice(product.price * selectedQuantity);
    }, [selectedQuantity]);

    const handleIncreaseQuantity = useCallback(() => {
      selectedQuantity >= 100
        ? setSelectedQuantity(selectedQuantity)
        : setSelectedQuantity(selectedQuantity + 1);
    }, [selectedQuantity]);

    const handleDecreaseQuantity = useCallback(() => {
      selectedQuantity <= 0
        ? setSelectedQuantity(selectedQuantity)
        : setSelectedQuantity(selectedQuantity - 1);
    }, [selectedQuantity]);

    useEffect(() => {
      navigation.setOptions({ title: product.title });
    }, [product]);

    const ratingCustomImage = require('../../assets/images/ratingfull.png');
    return (
      <Container>
        <ItemHeader>
          <TitleWrap>
            <ProductImage source={{ uri: product.image }} />
            <OwnerWrap>
              <OwnerTitle>{productOwnerTitle}</OwnerTitle>
              <CompanyLogo source={{ uri: product.image }} />
            </OwnerWrap>
          </TitleWrap>
          <BottomHeader>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductCat>{product.category}</ProductCat>
            <Price>£ {product.price}</Price>
          </BottomHeader>
        </ItemHeader>
        <ItemMidSection>
          <ScrollView showsVerticalScrollIndicator={false}>
            {new Array(7)
              .fill(<ItemDescription>{product.description}</ItemDescription>)
              .map(item => item)}
          </ScrollView>
        </ItemMidSection>
        <ItemFooter>
          <ItemRating>Rate:</ItemRating>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={product.rating}
            size={25}
            starImage={ratingCustomImage}
          />
        </ItemFooter>
        <AddWrap onPress={handleOpenSheet}>
          <AddButton>Add to cart</AddButton>
        </AddWrap>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          animateOnMount
          backdropComponent={BottomSheetBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <SheetWrap>
            <SheetTitle>{product.title}</SheetTitle>
            <SelectWrap>
              <SelectTitle>How many?</SelectTitle>
              <SelectOptionWrap>
                <TouchableOpacity onPress={handleDecreaseQuantity}>
                  <IncDecButton name="minus-circle" size={50} />
                </TouchableOpacity>
                <QuantityValue>{selectedQuantity}</QuantityValue>
                <TouchableOpacity onPress={handleIncreaseQuantity}>
                  <IncDecButton name="plus-circle" size={50} />
                </TouchableOpacity>
              </SelectOptionWrap>
              <SelectTitle>Total price: ${productTotalPrice}</SelectTitle>
            </SelectWrap>
            <SheetFooter>
              <AddWrap onPress={handleAddToCart}>
                <AddButton>Add to cart</AddButton>
              </AddWrap>
            </SheetFooter>
          </SheetWrap>
        </BottomSheet>
      </Container>
    );
  },
);

const ItemHeader = styled.View`
  flex: 1.5;
  width: 100%;
  height: 100%;
`;
const ProductImage = styled.ImageBackground`
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

const OwnerWrap = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.tertiary + 'D9'};
  margin: 10px;
  padding: 10px;
  flex: 0.9;
  border-radius: ${({ theme }) => theme.border.radius10}px;
`;

const OwnerTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;

const CompanyLogo = styled.Image`
  position: absolute;
  right: -30px;
  bottom: 0;
  height: 84px;
  width: 84px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.border.radius50}px;
`;
const BottomHeader = styled.View`
  flex: 0.2;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  border-bottom-width: 1px;
  border-top-width: 1px;
`;

const ProductTitle = styled.Text`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
const ProductCat = styled.Text`
  color: ${({ theme }) => theme.colors.red1};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.red};
  border-radius: ${({ theme }) => theme.border.radius5}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.black};
  elevation: 3;
`;
const Price = styled.Text`
  margin-left: 5px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;

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
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
`;

const ItemRating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin-right: 10px;
`;

const AddWrap = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  margin: 10px;
  background: ${({ theme }) => theme.colors.tertiary1};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius10}px;
`;

const AddButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1px;
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
  flex: 0.7;
`;
