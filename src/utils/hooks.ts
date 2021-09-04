import React from 'react';

export const useFunction = (func, ...args) =>
  React.useCallback(() => func(...args), [func, ...args]);
