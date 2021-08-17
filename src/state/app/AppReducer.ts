import { createReducer } from '@reduxjs/toolkit';

import { AppReducerState } from './AppInterfaces';
import { constants } from '../constants';

const INITIAL_STATE: AppReducerState = {
  language: 'en',
  allAppAds: [],
  tempImages: [],
  tempCompany: null,
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
  [constants.app.SET_COMPANY_INFO]: (state, { categories }) => {
    state.tempCompany = categories;
  },
});
