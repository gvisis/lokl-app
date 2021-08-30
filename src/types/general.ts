import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ProductScreenProps } from '../components/other/produce/Product';
import { CompanyItemProps } from '../components/company/Company';
import { ROUTES } from '../routes/RouteNames';
import { AdsProps, CompanyProduct } from '../state/app/AppInterfaces';

// Variables
export enum CART_ACTION {
  ADD = 'add',
  REMOVE = 'remove',
  CLEAR = 'clear',
  INC = 'inc',
  DEC = 'dec',
}
export enum ERROR_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
}
// Types
export type AnyObject = { [key: string]: any };
export type ErrorType = ERROR_TYPE.ERROR | ERROR_TYPE.SUCCESS | null;
export type ProductAddAction = CART_ACTION.INC | CART_ACTION.DEC;
export type ItemProps = AdsProps | CompanyProduct;

export type RootStackParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.HomeTab]: undefined;
  [ROUTES.TabNav]: undefined;
  [ROUTES.AuthNav]: undefined;
  [ROUTES.Error]: undefined;
  [ROUTES.Product]: undefined;
  [ROUTES.CartTab]: undefined;
  [ROUTES.Cart]: undefined;
  [ROUTES.CartItemsView]: undefined;
  [ROUTES.CartAddressView]: undefined;
  [ROUTES.CartPaymentView]: undefined;
  [ROUTES.SingleCategory]: undefined;
  [ROUTES.SingleProduct]: ProductScreenProps | undefined;
  [ROUTES.SingleCompany]: CompanyItemProps | undefined;
  [ROUTES.CompanyCategory]: CompanyItemProps | undefined;
  [ROUTES.Ads]: undefined;
  [ROUTES.AddAd]: undefined;
  [ROUTES.SingleAdView]: undefined;
  [ROUTES.Address]: undefined;
  [ROUTES.AddAddress]: undefined;
  [ROUTES.EditAddress]: undefined;
  [ROUTES.AdsTab]: undefined;
  [ROUTES.Profile]: undefined;
  [ROUTES.ProfileEdit]: undefined;
  [ROUTES.Search]: undefined;
  [ROUTES.Settings]: undefined;
  [ROUTES.Landing]: undefined;
  [ROUTES.Login]: undefined;
  [ROUTES.ForgotPassword]: undefined;
  [ROUTES.Signup]: undefined;
};

// Interfaces
export interface PayloadAction<T> {
  payload: T;
  type: string;
}
export interface ComponentNavProps<T = string> {
  navigation?: StackNavigationProp<RootStackParamList, T>;
  route?: RouteProp<RootStackParamList, T>;
}

export interface ItemCardProps {
  item: ItemProps;
  ads?: boolean;
  onPress?: string;
  productOwnerTitle?: string;
}
