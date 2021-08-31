export interface AppReducer {
  language: string;
  allAppAds: AdsProps[];
  tempImages?: ImagesProps[];
  allCompanies: CompanyProps[];
  categories: Category[];
  allProducts: CompanyProduct[];
}

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

export interface Product {
  id: string;
  title: string;
  description?: string;
  category: number;
  price: number;
  image: string;
  images?: UploadImageProps;
}

export interface CompanyProduct extends Product {
  owner: string;
  delivery: boolean;
  available: boolean;
  ratings: RatingData[];
  amount: number;
}

export interface AdsProps extends Product {
  dateRequired: string;
  ownerId: string;
  dateAdded: string;
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
