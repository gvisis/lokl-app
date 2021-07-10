import { combineReducers } from 'redux';

import { uiReducer } from './ui/UiReducer';
import { userReducer } from './user/UserReducer';
import { appReducer } from './app/AppReducer';

export const combinedReducers = combineReducers({
	ui: uiReducer,
	user: userReducer,
	app: appReducer,
});
