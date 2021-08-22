import { createReducer } from '@reduxjs/toolkit';

import { CartReducer } from './CartInterfaces';
import { constants } from '../constants';

const INITIAL_STATE: CartReducer = {
  cart: [],
  total: 0,
  quantity: 0,
};

export const cartReducer = createReducer(INITIAL_STATE, {
  [constants.cart.UPDATE_CART]: (state, { newCart }) => {
    state.cart = newCart;
  },

  [constants.cart.UPDATE_CART_TOTALS]: (state, { total, quantity }) => {
    state.total = total;
    state.quantity = quantity;
  },

  [constants.cart.CLEAR_CART]: () => INITIAL_STATE,
});
