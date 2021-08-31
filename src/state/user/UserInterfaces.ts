import { AdsProps, UploadImageProps } from '../app/AppInterfaces';
import { LANG, THEME } from '../../utils/variables';

// INTERFACES
export interface UserReducerState {
  userInfo: UserProps;
}

export interface UserAddress {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  default?: boolean;
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

export interface EditAddressProps {
  addressId: string;
  editedAddress: UserAddress;
}

export interface CreateNewAdProps {
  images: UploadImageProps[];
  newAd: AdsProps;
}

// TYPES
export type Languages = LANG.EN | LANG.LT;
export type Themes = THEME.DARK | THEME.LIGHT;
