import React from 'react';

import { api } from '../api';

export const useFunction = (func, ...args) => {
  React.useCallback(() => func(...args), [func, ...args]);
};
export const useRatingChange = (func, action, item, userRating: number) => {
  const newRatingObject = { id: api.getUserInfo().uid, rating: userRating };
  func(action(item, newRatingObject));
};
