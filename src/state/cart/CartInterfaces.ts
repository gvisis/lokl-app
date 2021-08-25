import { CompanyProduct } from '../app/AppInterfaces';
import { UserAddress } from '../user/UserReducer';

export type ActionType = 'add' | 'remove';

export interface CartReducer {
  cart: CompanyProduct[];
  total: number;
  quantity: number;
  shippingAddress: UserAddress;
}
export interface CartActions {
  cartAction: ActionType;
  product: CompanyProduct;
  selectedQuantity?: number;
  type?: string;
}
