export type AnyObject = { [key: string]: any };

export type TODO = any;

export interface PayloadAction<T> {
  payload: T;
  type: string;
}
