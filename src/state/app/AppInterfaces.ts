export interface AppReducer {
  language: string;
  allAppAds: AdsProps[];
  tempImages?: TempImages[];
  allCompanies: CompanyProps[];
  categories: Category[];
  allProducts: CompanyProduct[];
}

export type TempImages = { url: string; adId: string };

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
  images?: UploadImageProps;
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
  ratings: RatingData[];
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
// Sagas interfaces
export interface CompanySagaProps {
  company?: CompanyProps;
  companyData?: CompanyProps;
  ratingData?: RatingData;
}
export interface ProductSagaProps {
  product?: CompanyProduct;
  ratingData?: RatingData;
}
