import { constants } from '../constants';

export const setLanguage = (payload: string) => ({
  type: constants.app.SET_LANGUAGE,
  payload,
});

export const appActions = {
  setLanguage,
};
