import { CompanyProduct } from '../app/AppInterfaces';
import { ActionType, CartActions } from './CartInterfaces';
import { constants } from '../constants';
import { UserAddress } from '../user/UserInterfaces';

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

const updateCart = (newCart: CompanyProduct[]) => ({
  type: constants.cart.UPDATE_CART,
  newCart,
});

const setCartStage = (cartStage: string) => ({
  type: constants.cart.SET_CART_STAGE,
  cartStage,
});

const navigateCart = (currentScreen: string) => ({
  type: constants.cart.NAVIGATE_CART,
  currentScreen,
});

const getCartTotals = () => ({
  type: constants.cart.GET_CART_TOTALS,
});

const cartFinishPurchase = (finishPurchase: boolean) => ({
  type: constants.cart.CART_FINISH_PURCHASE,
  finishPurchase,
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
  setCartStage,
  navigateCart,
  setShippingAddress,
  cartFinishPurchase,
};
