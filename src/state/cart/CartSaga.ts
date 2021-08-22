import { put, select, takeEvery } from 'redux-saga/effects';

import { actions } from '../actions';
import { CompanyProduct } from '../app/AppInterfaces';
import { constants } from '../constants';
import { CartActions, CartReducer } from './CartInterfaces';

function* handleCartActions({
  cartAction,
  product,
  selectedQuantity,
}: CartActions) {
  try {
    const { cart } = yield select(state => state.cart);
    let tempCart;
    // if it's not first item in the cart
    if (
      !cart.some((item: CompanyProduct) => item.id === product.id) &&
      cartAction === 'add'
    ) {
      const updatedAmountProduct = {
        ...product,
        amount: ++product.amount,
      };

      tempCart = [...cart, updatedAmountProduct];
      yield put(actions.cart.updateCart(tempCart));
    } else {
      tempCart = cart
        .map((item: CompanyProduct) => {
          if (item.id === product.id) {
            if (cartAction === 'add') {
              item = {
                ...item,
                amount: selectedQuantity
                  ? selectedQuantity + item.amount
                  : ++item.amount,
              };
            }
            if (cartAction === 'remove') {
              item = { ...item, amount: --item.amount };
            }
          }
          return item;
        })
        .filter((item: CompanyProduct) => item.amount !== 0);
    }
    yield put(actions.cart.updateCart(tempCart));
  } catch (e) {
    console.log('checkaction error', e);
  } finally {
    yield put(actions.cart.getCartTotals());
  }
}

function* handleGetCartTotals() {
  try {
    const cart: CartReducer = yield select(state => state.cart);
    const { total, quantity } = cart.cart.reduce(
      (cartTotal, cartItem: CompanyProduct) => {
        console.log('cartTotal', cartTotal);

        const itemTotal = cartItem.price * cartItem.amount;
        cartTotal.total += parseFloat(itemTotal.toFixed(2));
        cartTotal.quantity += cartItem.amount;
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      },
    );
    yield put(actions.cart.updateCartTotals(total, quantity));
  } catch (e) {
    console.log('update cart error', e);
  }
}

export function* cartSaga() {
  yield takeEvery(constants.cart.GET_CART_TOTALS, handleGetCartTotals);
  yield takeEvery(constants.cart.CHECK_CART_ACTIONS, handleCartActions);
}
