import React, {useContext, useReducer} from 'react';

import reducer from './reducers';
import {constants} from './constants';

export const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  userEmail: '',
};
console.warn(initialState.userEmail, 'contexte');
export const AppProvider = ({children}) => {
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
  const handlePasswordReset = email =>
    dispatch({
      type: constants.app.PASSWORD_RESET,
      payload: {email},
    });

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogout,
        handleLogin,
        handleRegistration,
        handlePasswordReset,
        getUserEmail,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
