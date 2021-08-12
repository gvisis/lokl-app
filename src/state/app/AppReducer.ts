import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

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
  owner: {
    id: string;
    name: string;
    email: string;
    city: string;
  };
}

export interface AppReducerState {
  language: string;
  allAppAds: AdsProps;
}

const INITIAL_STATE: AppReducerState = {
  language: 'en',
  allAppAds: null,
};

export const appReducer = createReducer(INITIAL_STATE, {
  [constants.app.SET_LANGUAGE]: (state, action) => {
    state.language = action.language;
  },

  [constants.app.SET_ALL_ADS]: (state, { ads }) => {
    state.allAppAds = ads;
  },
});
