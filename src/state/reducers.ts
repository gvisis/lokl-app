import { AnyAction, CombinedState, combineReducers } from 'redux';

import { uiReducer, UiReducerState } from './ui/UiReducer';
import { userReducer, UserReducerState } from './user/UserReducer';
import { cartReducer } from './cart/CartReducer';
import { CartReducer } from './cart/CartInterfaces';
import { appReducer } from './app/AppReducer';
import { AppReducer } from './app/AppInterfaces';

export interface RootState {
  user: UserReducerState;
  ui: UiReducerState;
  app: AppReducer;
  cart: CartReducer;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  ui: uiReducer,
  cart: cartReducer,
  user: userReducer,
  app: appReducer,
});

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

export const rootReducer = (state: RootState, action: AnyAction) =>
  combinedReducer(state, action);
