import { ProductScreenProps } from '../components/produce/Product';
import { CompanyItemProps } from '../components/company/Company';
import { ROUTES } from './RouteNames';

export type RootStackParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.HomeTab]: undefined;
  [ROUTES.TabNav]: undefined;
  [ROUTES.AuthNav]: undefined;
  [ROUTES.Error]: undefined;
  [ROUTES.Product]: undefined;
  [ROUTES.SingleProduct]: ProductScreenProps | undefined;
  [ROUTES.SingleCompany]: CompanyItemProps | undefined;
  [ROUTES.CompanyCategory]: CompanyItemProps | undefined;
  [ROUTES.Ads]: undefined;
  [ROUTES.Profile]: undefined;
  [ROUTES.ProfileEdit]: undefined;
  [ROUTES.Settings]: undefined;
  [ROUTES.Landing]: undefined;
  [ROUTES.Login]: undefined;
  [ROUTES.ForgotPassword]: undefined;
  [ROUTES.Signup]: undefined;
};
