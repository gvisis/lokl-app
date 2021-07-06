//! To be used with redux later on

import {constants} from '../constants';

export const logToConsole = () => ({
  type: constants.app.IS_LOGGED_IN,
});

export const appActions = {
  logToConsole,
};
