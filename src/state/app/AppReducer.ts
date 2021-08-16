import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';
import { setTempImages } from './AppActions';

interface AdsProps {
  id: string;
  title: string;
  images?: 'imgUri';
  category: string;
  subcategory: string;
  price: number;
  description: string;
  dateRequired: string;
  dateAdded: string;
}
type TempImages = { url: string; id: string };

export interface AppReducerState {
  language: string;
  allAppAds: AdsProps[];
  tempImages: TempImages[];
}

const INITIAL_STATE: AppReducerState = {
  language: 'en',
  allAppAds: null,
  tempImages: [],
};

export const appReducer = createReducer(INITIAL_STATE, {
  [constants.app.SET_LANGUAGE]: (state, action) => {
    state.language = action.language;
  },

  [constants.app.SET_ALL_ADS]: (state, { ads }) => {
    state.allAppAds = ads;
  },
  [constants.app.SET_TEMP_IMAGES]: (state, { images }) => {
    state.tempImages = [...state.tempImages, images];
  },
});
