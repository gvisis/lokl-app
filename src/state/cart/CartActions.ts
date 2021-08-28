import { CompanyProduct } from '../app/AppInterfaces';
import { ActionType, CartActions } from './CartInterfaces';
import { constants } from '../constants';
import { UserAddress } from '../user/UserReducer';

const checkCartActions = (
  cartAction: ActionType,
  product: CompanyProduct,
  selectedQuantity?: number,
): CartActions => ({
  type: constants.cart.CHECK_CART_ACTIONS,
  cartAction,
  product,
  selectedQuantity,
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
const removeFromCart = (itemToRemove: CompanyProduct) => ({
  type: constants.cart.REMOVE_FROM_CART,
  itemToRemove,
});
export const setShippingAddress = (shippingAddress: UserAddress) => ({
  type: constants.cart.SET_SHIPPING_ADDRESS,
  shippingAddress,
});
export const clearCart = () => ({
  type: constants.cart.CLEAR_CART,
});

export const cartActions = {
  updateCart,
  clearCart,
  getCartTotals,
  updateCartTotals,
  removeFromCart,
  checkCartActions,
  setShippingAddress,
};
