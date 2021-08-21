import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export interface CartReducer {
  cart: object[] | null;
  total: number;
  quantity: number;
}

const INITIAL_STATE: CartReducer = {
  cart: [],
  total: 0,
  quantity: 0,
};

export const cartReducer = createReducer(INITIAL_STATE, {
  [constants.cart.UPDATE_CART]: (state, action) => {
    state.cart = [...state.cart, action.product];
    state.total += parseFloat(action.product.price);
    state.quantity++;
    console.log('state', state);
  },
  [constants.cart.CLEAR_CART]: () => INITIAL_STATE,
});
