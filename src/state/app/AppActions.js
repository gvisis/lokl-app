//! To be used with redux later on

import {constants} from '../constants';

export const logToConsole = () => ({
  type: constants.app.IS_LOGGED_IN,
});

export const changeLogged = () => ({
  type: constants.app.CHANGE_LOGGED,
});

export const appActions = {
  logToConsole,
  changeLogged,
};
