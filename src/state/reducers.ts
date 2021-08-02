import { AnyAction, CombinedState, combineReducers } from 'redux';

import { uiReducer, UiReducerState } from './ui/UiReducer';
import { userReducer, UserReducerState } from './user/UserReducer';
import { appReducer, AppReducerState } from './app/AppReducer';

export interface RootState {
  user: UserReducerState;
  ui: UiReducerState;
  app: AppReducerState;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  ui: uiReducer,
  user: userReducer,
  app: appReducer,
});

export const rootReducer = (state: RootState, action: AnyAction) =>
  combinedReducer(state, action);
