import { AdsProps } from '../app/AppInterfaces';

// INTERFACES
export interface UserReducerState {
  userInfo: UserProps;
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  default: boolean;
}

export interface UserProps {
  username: string;
  name: string;
  email: string;
  phone?: string;
  address?: UserAddress[];
  ads?: AdsProps[];
  lang?: Languages;
}

// TYPES
export type Languages = 'en' | 'lt';
export type Themes = 'light' | 'dark';
