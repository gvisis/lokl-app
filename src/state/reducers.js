import {constants} from './constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.app.IS_LOGGED_IN:
      console.warn(state.isLoggedIn);
      return {...state};
    case constants.app.CHANGE_LOGGED:
      return {...state, isLoggedIn: !state.isLoggedIn};
    default:
      return state;
  }
};

export default reducer;
