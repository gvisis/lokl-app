import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { GestureResponderEvent, TextInputProps } from 'react-native';

import { CompanyItemProps } from '../components/company/Company';
import { ROUTES } from '../routes/RouteNames';
import {
  AdsProps,
  CompanyProduct,
  CompanyProps,
} from '../state/app/AppInterfaces';
import {
  CART_ACTION,
  ERROR_TYPE,
  LANG,
  ON_SYNC,
  THEME,
} from '../utils/variables';

// Types
export type AnyObject = { [key: string]: any };
export type ErrorType = ERROR_TYPE.ERROR | ERROR_TYPE.SUCCESS | null;
export type ProductAddAction = CART_ACTION.INC | CART_ACTION.DEC;
export type ItemProps = AdsProps | CompanyProduct;
export type ThemeTypes = THEME.LIGHT | THEME.DARK;
export type LanguageTypes = LANG.EN | LANG.LT;
export type SetOnSync = ON_SYNC.BUTTON | ON_SYNC.USER | ON_SYNC.APP;
export type ApiProps<T> = (email: string, password?: string) => Promise<T>;
export type CartNaviHandleProps = {
  currentScreen:
    | ROUTES.CartItemsView
    | ROUTES.CartAddressView
    | ROUTES.CartPaymentView;
};

export type RootStackParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.HomeTab]: undefined;
  [ROUTES.TabNav]: undefined;
  [ROUTES.AuthNav]: undefined;
  [ROUTES.Product]: ProductViewProps | undefined;
  [ROUTES.CartTab]: undefined;
  [ROUTES.CartItemsView]: undefined;
  [ROUTES.CartAddressView]: undefined;
  [ROUTES.CartPaymentView]: undefined;
  [ROUTES.SingleCategory]: undefined;
  [ROUTES.SingleProduct]: ProductScreenProps | undefined;
  [ROUTES.SingleCompany]: CompanyItemProps | undefined;
  [ROUTES.CompanyCategory]: CompanyItemProps | undefined;
  [ROUTES.Ads]: undefined;
  [ROUTES.AddAd]: AddAdViewProps | undefined;
  [ROUTES.SingleAdView]: undefined;
  [ROUTES.Address]: undefined;
  [ROUTES.AddAddress]: undefined;
  [ROUTES.AdsTab]: undefined;
  [ROUTES.Profile]: undefined;
  [ROUTES.ProfileEdit]: undefined;
  [ROUTES.Settings]: undefined;
  [ROUTES.Landing]: undefined;
  [ROUTES.Login]: undefined;
  [ROUTES.ForgotPassword]: undefined;
  [ROUTES.Signup]: undefined;
};

// Interfaces
interface ProductViewProps extends ProductScreenProps {
  item?: CompanyProduct;
}
interface AddAdViewProps {
  onPress?: (event: GestureResponderEvent) => void;
}

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
  isAdsItem?: boolean;
  onPress?: string;
  productOwnerTitle?: string;
}

export interface ProductScreenProps {
  item?: CompanyProduct;
  allCompanies?: CompanyProps[];
  width?: number;
  height?: number;
  productOwnerTitle?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface ProfileRowProps {
  onPress?: (e: GestureResponderEvent) => void;
  rowLeft?: React.ReactElement;
  rowRight?: React.ReactElement;
  text?: string;
  value?: string;
  label?: string;
  editable?: boolean;
  multiline?: boolean;
  touchable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: TextInputProps['keyboardType'];
  onChangeText?: (text: string) => void;
  textSize?: number;
}

export interface SizeProps {
  width: number;
  height: number;
}

export interface ProfileTextProps {
  label?: string;
  textSize?: number;
}
