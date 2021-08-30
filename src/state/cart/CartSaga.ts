import i18next from 'i18next';
import { call, put, select, takeEvery } from 'typed-redux-saga';

import { ROUTES } from '../../routes/RouteNames';
import { ERROR_TYPE } from '../../types/general';
import { actions } from '../actions';
import { CompanyProduct } from '../app/AppInterfaces';
import { constants } from '../constants';
import { CartActions, CartReducer, CartRemove } from './CartInterfaces';

function* handleCartActions({
  cartAction,
  product,
  selectedQuantity,
}: CartActions) {
  try {
    const { cart } = yield* select(state => state.cart);
    let tempCart;
    // if it's not first item in the cart
    if (
      !cart.some((item: CompanyProduct) => item.id === product.id) &&
      cartAction === 'add'
    ) {
      const updatedAmountProduct = {
        ...product,
        amount: selectedQuantity
          ? selectedQuantity + product.amount
          : ++product.amount,
      };

      tempCart = [...cart, updatedAmountProduct];
      yield* put(actions.cart.updateCart(tempCart));
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
    yield* put(actions.cart.updateCart(tempCart));
  } catch (e) {
    console.log('checkaction error', e);
  } finally {
    yield* put(actions.cart.getCartTotals());
  }
}
function* handleRemoveFromCart({ itemToRemove }: CartRemove) {
  try {
    const { cart } = yield* select(state => state.cart);
    const tempCart = cart.filter(
      (item: CompanyProduct) => itemToRemove.id !== item.id,
    );
    yield* put(actions.cart.updateCart(tempCart));
  } catch (e) {
    console.log('checkaction error', e);
  } finally {
    yield* put(actions.cart.getCartTotals());
  }
}

function* handleGetCartTotals() {
  try {
    const cart: CartReducer = yield* select(state => state.cart);
    const { total, quantity } = cart.cart.reduce(
      (cartTotal, cartItem: CompanyProduct) => {
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
    yield* put(actions.cart.updateCartTotals(total, quantity));
  } catch (e) {
    console.log('update cart error', e);
  }
}
function* handleFinishPurchase({ finishPurchase }: boolean) {
  const delay = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));
  try {
    if (finishPurchase) {
      yield* call(delay, 3000);
      yield* put(actions.cart.clearCart());
      yield* put(actions.cart.cartFinishPurchase(false));
      yield* put(
        actions.ui.setStatus(ERROR_TYPE.SUCCESS, true, 'Purchase Successful'),
      );
    }
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18next.t('errors:thereWasError'),
      ),
    );
  }
}

function* handleCartNavigation({ currentScreen }: string) {
  const possibleScreens = [
    ROUTES.CartItemsView,
    ROUTES.CartAddressView,
    ROUTES.CartPaymentView,
  ];
  try {
    if (possibleScreens.includes(currentScreen)) {
      yield* put(actions.cart.setCartStage(currentScreen));
    }
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18next.t('errors:thereWasError'),
      ),
    );
  }
}

export function* cartSaga() {
  yield* takeEvery(constants.cart.GET_CART_TOTALS, handleGetCartTotals);
  yield* takeEvery(constants.cart.REMOVE_FROM_CART, handleRemoveFromCart);
  yield* takeEvery(constants.cart.CHECK_CART_ACTIONS, handleCartActions);
  yield* takeEvery(constants.cart.NAVIGATE_CART, handleCartNavigation);
  yield* takeEvery(constants.cart.CART_FINISH_PURCHASE, handleFinishPurchase);
}
