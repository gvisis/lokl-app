import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { ROUTES } from '../../routes/RouteNames';
import { RootStackParamList } from '../../types/general';

export interface AppReducerState {
  language: string;
  allAppAds: AdsProps[];
  tempImages?: TempImages[];
  tempCompany: CompanyProps;
  allCompanies: CompanyProps[];
  categories: Category[];
}

export type TempImages = { url: string; id: string };

export interface ImagesProps {
  url: string;
  id: string;
}
export interface Category {
  id: string;
  title: string;
  image?: string;
}

export interface UploadImageProps {
  adId: string;
  images: ImagesProps[];
}

export interface AdsProps {
  id: string;
  title: string;
  images?: string[];
  category: string;
  subcategory: string;
  price: number;
  description: string;
  dateRequired: string;
  dateAdded: string;
}
export interface CompanyProduct {
  id: string;
  owner: string;
  title: string;
  image: string;
  description?: string;
  category: string;
  price: number;
  delivery: boolean;
  available: boolean;
  rating: number;
}

export interface CompanyProps {
  id: string;
  title: string;
  image?: string;
  description?: string;
  website?: string;
  categories: string[];
  rating: number;
  produce?: CompanyProduct[];
  address: {
    street: string;
    city: string;
    postCode: string;
  };
  phone: number;
  email?: string;
}

//? How to make it custom for each component with a custom ROUTES name ? like...
//! export interface NavigationProps<CUSTOM_NAME> {
//! navigation: StackNavigationProp<RootStackParamList, CUSTOM_NAME>;
//! route: RouteProp<RootStackParamList, CUSTOM_NAME>;
//! }

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, ROUTES.SingleCompany>;
  route: RouteProp<RootStackParamList, ROUTES.SingleCompany>;
}
