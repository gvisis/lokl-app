import { CompanyProduct } from '../app/AppInterfaces';

export type ActionType = 'add' | 'remove';

export interface CartReducer {
  cart: CompanyProduct[];
  total: number;
  quantity: number;
}
export interface CartActions {
  cartAction: ActionType;
  product: CompanyProduct;
  productOwner?: string;
  type?: string;
}
