import { createReducer } from '@reduxjs/toolkit';

import { AppReducerState } from './AppInterfaces';
import { constants } from '../constants';

const INITIAL_STATE: AppReducerState = {
  language: 'en',
  allAppAds: [],
  tempImages: [],
  tempCompany: null,
  allCompanies: null,
  categories: null,
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
  [constants.app.SET_COMPANY_INFO]: (state, { company }) => {
    state.tempCompany = company;
  },
  [constants.app.SET_ALL_COMPANIES]: (state, { companies }) => {
    state.allCompanies = companies;
  },
  [constants.app.SET_CATEGORIES]: (state, { categories }) => {
    state.categories = categories;
  },
});
