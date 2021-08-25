export interface AppReducer {
  language: string;
  allAppAds: AdsProps[];
  tempImages?: TempImages[];
  allCompanies: CompanyProps[];
  categories: Category[];
  allProducts: CompanyProduct[];
}

export type TempImages = { url: string; id: string };

export interface ImagesProps {
  url: string;
  id: string;
}
export interface Category {
  id: number;
  title: string;
  image?: string;
}

export interface RatingData {
  rating: number;
  id: string;
}

export interface UploadImageProps {
  adId: string;
  images: ImagesProps[];
}

export interface AdsProps {
  id: string;
  title: string;
  images?: string[];
  category: number;
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
  category: number;
  price: number;
  delivery: boolean;
  available: boolean;
  rating: number;
  amount: number;
}

export interface CompanyProps {
  id: string;
  title: string;
  image?: string;
  description?: string;
  website?: string;
  categories: number[];
  ratings: RatingData[];
  produce?: CompanyProduct[];
  address: {
    street: string;
    city: string;
    postCode: string;
  };
  phone: number;
  email?: string;
}
