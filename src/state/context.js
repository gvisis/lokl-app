import React, {useContext, useReducer} from 'react';
import reducer from './reducers';

const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  error: null,
};

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{...state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
