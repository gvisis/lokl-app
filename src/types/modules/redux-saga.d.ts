import { SelectEffect, Tail } from '@redux-saga/core/effects';
import 'redux-saga/effects';

import { RootState } from '../../state/reducers';

declare module 'redux-saga/effects' {
  export function select<T, Fn extends (state: RootState, ...args: any[]) => T>(
    selector: Fn,
    ...args: Tail<Parameters<FN>>
  ): SelectEffect;
}
