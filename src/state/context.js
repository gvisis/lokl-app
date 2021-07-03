import React, {useContext, useReducer} from 'react';
import reducer from './reducers';
import {constants} from './constants';
import {actions} from './actions';

const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  error: null,
};

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logToConsole = () => dispatch({type: constants.app.IS_LOGGED_IN});
  const changeLogged = () => dispatch({type: constants.app.CHANGE_LOGGED});

  return (
    <AppContext.Provider value={{...state, logToConsole, changeLogged}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider};
