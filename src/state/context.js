import React, {useContext, useEffect, useReducer} from 'react';

import reducer from './reducers';
import {constants} from './constants';

const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  userEmail: '',
};
console.warn(initialState.userEmail, 'contexte');
const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserEmail = () => {
    dispatch({type: constants.app.GET_USER_EMAIL});
  };

  const handleLogin = (email, password) =>
    dispatch({
      type: constants.app.LOGIN,
      payload: {email, password},
    });

  const handleLogout = () =>
    dispatch({
      type: constants.app.LOGOUT,
    });

  const handleRegistration = (email, password) =>
    dispatch({
      type: constants.app.REGISTER,
      payload: {email, password},
    });

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogout,
        handleLogin,
        handleRegistration,
        getUserEmail,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
