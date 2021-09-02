import i18n from 'i18next';
import { delay, put, select, takeEvery } from 'typed-redux-saga';

import { ROUTES } from '../../routes/RouteNames';
import { CartNaviHandleProps } from '../../types/general';
import { CART_ACTION, ERROR_TYPE } from '../../utils/variables';
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
      cartAction === CART_ACTION.ADD
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
            if (cartAction === CART_ACTION.ADD) {
              item = {
                ...item,
                amount: selectedQuantity
                  ? selectedQuantity + item.amount
                  : ++item.amount,
              };
            }
            if (cartAction === CART_ACTION.REMOVE) {
              item = { ...item, amount: --item.amount };
            }
          }
          return item;
        })
        .filter((item: CompanyProduct) => item.amount !== 0);
    }
    yield* put(actions.cart.updateCart(tempCart));
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('error:cart/cartUpdating'),
      ),
    );
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
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('error:cart/removeFromCart'),
      ),
    );
  } finally {
    yield* put(actions.cart.getCartTotals());
  }
}

function* handleGetCartTotals() {
  try {
    const cart: CartReducer = yield* select(state => state.cart);
    const { total, quantity } = cart.cart.reduce(
      (cartTotal, cartItem: CompanyProduct) => {
        const itemTotal = parseFloat(cartItem.price) * cartItem.amount;
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
    yield* put(actions.ui.setStatus(ERROR_TYPE.ERROR, true, e.message));
  }
}
function* handleFinishPurchase({
  finishPurchase,
}: {
  finishPurchase: boolean;
}) {
  try {
    if (finishPurchase) {
      // Fake delay to show loading while "payment processing"
      yield delay(3000);
      yield* put(actions.cart.clearCart());
      yield* put(actions.cart.cartFinishPurchase(false));
      yield* put(
        actions.ui.setStatus(
          ERROR_TYPE.SUCCESS,
          true,
          i18n.t('cart:purchaseSuccess'),
        ),
      );
    }
  } catch (e) {
    yield* put(
      actions.ui.setStatus(
        ERROR_TYPE.ERROR,
        true,
        i18n.t('errors:thereWasError'),
      ),
    );
  }
}
function* handleCartNavigation({ currentScreen }: CartNaviHandleProps) {
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
        i18n.t('errors:thereWasError'),
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
