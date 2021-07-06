import React, {useContext, useReducer} from 'react';
import reducer from './reducers';
import {constants} from './constants';

export const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
};

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logToConsole = () => dispatch({type: constants.app.IS_LOGGED_IN});
  const handleLogOut = () => dispatch({type: constants.app.LOG_OUT});
  const handleLogIn = () => dispatch({type: constants.app.LOG_IN});

  return (
    <AppContext.Provider
      value={{...state, logToConsole, handleLogOut, handleLogIn}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
