import { appActions } from './app/AppActions';
import { uiActions } from './ui/UiActions';
import { userActions } from './user/UserActions';
import { cartActions } from './cart/CartActions';

export const actions = {
  ui: uiActions,
  app: appActions,
  cart: cartActions,
  user: userActions,
};
