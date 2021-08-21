import { constants } from '../constants';

const updateCart = (product, productOwner) => ({
  type: constants.cart.UPDATE_CART,
  product,
  productOwner,
});

const removeFromCart = () => ({
  type: constants.cart.REMOVE_FROM_CART,
});

export const cartActions = {
  updateCart,
  removeFromCart,
};
