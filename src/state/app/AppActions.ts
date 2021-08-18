import { constants } from '../constants';
import { ImagesProps } from './AppInterfaces';

export const setLanguage = (payload: string) => ({
  type: constants.app.SET_LANGUAGE,
  payload,
});

export const fetchAllAds = () => ({
  type: constants.app.FETCH_ALL_ADS,
});

export const setAllAds = ads => ({
  type: constants.app.SET_ALL_ADS,
  ads,
});
export const setTempImages = images => ({
  type: constants.app.SET_TEMP_IMAGES,
  images,
});

export const uploadAdImages = (adId: string, images: ImagesProps[]) => ({
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

export const fetchAllCompanies = () => ({
  type: constants.app.FETCH_ALL_COMPANIES,
});

export const setAllCompanies = (companies: string[]) => ({
  type: constants.app.SET_ALL_COMPANIES,
  companies,
});

export const setCompanyInfo = (companyInfo: any) => ({
  type: constants.app.SET_COMPANY_INFO,
  companyInfo,
});
export const setProducts = (products: any) => ({
  type: constants.app.SET_ALL_PRODUCTS,
  products,
});

export const appActions = {
  pickImage,
  setAllAds,
  setProducts,
  fetchAllAds,
  setLanguage,
  setTempImages,
  setCategories,
  setCompanyInfo,
  uploadAdImages,
  setAllCompanies,
  fetchCategories,
  fetchAllCompanies,
};
