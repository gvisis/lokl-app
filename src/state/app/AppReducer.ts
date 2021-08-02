import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export interface AppReducerState {
  language: string;
}

const INITIAL_STATE: AppReducerState = {
  language: 'en',
};

export const appReducer = createReducer(INITIAL_STATE, {
  [constants.app.SET_LANGUAGE]: (state, action) => {
    state.language = action.language;
  },
});
