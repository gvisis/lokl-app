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

export const uploadAdImages = (adId: string, images: ImagesProps[]) => ({
  type: constants.app.UPLOAD_AD_IMAGES,
  adId,
  images,
});

export const appActions = {
  setAllAds,
  fetchAllAds,
  setLanguage,
  uploadAdImages,
};
