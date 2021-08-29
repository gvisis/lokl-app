import { createReducer } from '@reduxjs/toolkit';

import { CartReducer } from './CartInterfaces';
import { constants } from '../constants';

const INITIAL_STATE: CartReducer = {
  cart: [],
  total: 0,
  quantity: 0,
  shippingAddress: null,
  stage: null,
};

export const cartReducer = createReducer(INITIAL_STATE, {
  [constants.cart.UPDATE_CART]: (state, { newCart }) => {
    state.cart = newCart;
  },
  [constants.cart.SET_CART_STAGE]: (state, { cartStage }) => {
    state.stage = cartStage;
  },
  [constants.cart.UPDATE_CART_TOTALS]: (state, { total, quantity }) => {
    state.total = total;
    state.quantity = quantity;
  },
  [constants.cart.SET_SHIPPING_ADDRESS]: (state, { shippingAddress }) => {
    state.shippingAddress = shippingAddress;
  },
  [constants.cart.CLEAR_CART]: () => INITIAL_STATE,
});
