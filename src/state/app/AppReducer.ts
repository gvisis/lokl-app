import { createReducer } from '@reduxjs/toolkit';

import { AppReducer } from './AppInterfaces';
import { constants } from '../constants';
import { LANG } from '../../utils/variables';

const INITIAL_STATE: AppReducer = {
  language: LANG.EN,
  allAppAds: [],
  tempImages: [],
  allCompanies: null,
  categories: null,
  allProducts: null,
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
  [constants.app.SET_ALL_COMPANIES]: (state, { companies }) => {
    state.allCompanies = companies;
  },
  [constants.app.SET_CATEGORIES]: (state, { categories }) => {
    state.categories = categories;
  },
  [constants.app.SET_ALL_PRODUCTS]: (state, { products }) => {
    state.allProducts = products;
  },
});
