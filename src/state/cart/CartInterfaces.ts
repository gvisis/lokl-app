import { CompanyProduct } from '../app/AppInterfaces';
import { UserAddress } from '../user/UserInterfaces';
import { CART_ACTION } from '../../utils/variables';

export type ActionType = CART_ACTION.ADD | CART_ACTION.REMOVE;

export interface CartReducer {
  cart: CompanyProduct[];
  total: number;
  quantity: number;
  shippingAddress: UserAddress;
  stage: string;
  finishPurchase: boolean;
}

// CartSagas
export interface CartActions {
  cartAction: ActionType;
  product: CompanyProduct;
  selectedQuantity?: number;
  type?: string;
}
export interface CartRemove {
  type: CART_ACTION.REMOVE;
  itemToRemove: CompanyProduct;
}
