import { constants } from '../constants';
import {
  CompanyProduct,
  CompanyProps,
  RatingData,
  UploadImageProps,
} from './AppInterfaces';

export const setLanguage = (payload: string) => ({
  type: constants.app.SET_LANGUAGE,
  payload,
});

export const setAllAds = ads => ({
  type: constants.app.SET_ALL_ADS,
  ads,
});

export const uploadAdImages = (adId: string, images: UploadImageProps[]) => ({
  type: constants.app.UPLOAD_AD_IMAGES,
  adId,
  images,
});
export const pickImage = () => ({
  type: constants.app.PICK_IMAGE,
});

export const fetchCategories = () => ({
  type: constants.app.FETCH_CATEGORIES,
});

export const setCategories = (categories: string[]) => ({
  type: constants.app.SET_CATEGORIES,
  categories,
});

export const setAllCompanies = (companies: CompanyProps[]) => ({
  type: constants.app.SET_ALL_COMPANIES,
  companies,
});

export const setCompanyRating = (
  company: CompanyProps,
  ratingData: RatingData,
) => ({
  type: constants.app.SET_COMPANY_RATING,
  company,
  ratingData,
});

export const setProductRating = (
  product: CompanyProduct,
  ratingData: RatingData,
) => ({
  type: constants.app.SET_PRODUCT_RATING,
  product,
  ratingData,
});

export const setProducts = (products: any) => ({
  type: constants.app.SET_ALL_PRODUCTS,
  products,
});

export const appActions = {
  setAllAds,
  setProducts,
  setAllCompanies,
  setCategories,
  setCompanyRating,
  setProductRating,
  setLanguage,
  fetchCategories,
  pickImage,
  uploadAdImages,
};
