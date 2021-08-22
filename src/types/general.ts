import { ProductScreenProps } from '../components/produce/Product';
import { CompanyItemProps } from '../components/company/Company';
import { ROUTES } from '../routes/RouteNames';

export type AnyObject = { [key: string]: any };
export type ErrorType = 'error' | 'success' | null;

export interface PayloadAction<T> {
  payload: T;
  type: string;
}

export type RootStackParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.HomeTab]: undefined;
  [ROUTES.TabNav]: undefined;
  [ROUTES.AuthNav]: undefined;
  [ROUTES.Error]: undefined;
  [ROUTES.Product]: undefined;
  [ROUTES.CartTab]: undefined;
  [ROUTES.Cart]: undefined;
  [ROUTES.CartItemView]: undefined;
  [ROUTES.CartAddressView]: undefined;
  [ROUTES.CartPaymentView]: undefined;
  [ROUTES.SingleProduct]: ProductScreenProps | undefined;
  [ROUTES.SingleCompany]: CompanyItemProps | undefined;
  [ROUTES.CompanyCategory]: CompanyItemProps | undefined;
  [ROUTES.Ads]: undefined;
  [ROUTES.AddAd]: undefined;
  [ROUTES.AdsTab]: undefined;
  [ROUTES.Profile]: undefined;
  [ROUTES.ProfileEdit]: undefined;
  [ROUTES.Settings]: undefined;
  [ROUTES.Landing]: undefined;
  [ROUTES.Login]: undefined;
  [ROUTES.ForgotPassword]: undefined;
  [ROUTES.Signup]: undefined;
};
