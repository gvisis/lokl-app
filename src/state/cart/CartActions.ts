import { CompanyProduct } from '../app/AppInterfaces';
import { ActionType, CartActions } from './CartInterfaces';
import { constants } from '../constants';

const checkCartActions = (
  cartAction: ActionType,
  product: CompanyProduct,
): CartActions => ({
  type: constants.cart.CHECK_CART_ACTIONS,
  cartAction,
  product,
});

const updateCart = newCart => ({
  type: constants.cart.UPDATE_CART,
  newCart,
});

const getCartTotals = () => ({
  type: constants.cart.GET_CART_TOTALS,
});

const updateCartTotals = (total: number, quantity: number) => ({
  type: constants.cart.UPDATE_CART_TOTALS,
  total,
  quantity,
});

export const cartActions = {
  updateCart,
  getCartTotals,
  updateCartTotals,
  checkCartActions,
};
