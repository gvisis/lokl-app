import React, {useContext, useReducer} from 'react';

import reducer from './reducers';
import {constants} from './constants';

export const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  userEmail: '',
};

console.warn(initialState.isLoggedIn);
export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      email,
      password,
    });
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogout,
        handleRegistration,
        handleLogin,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
