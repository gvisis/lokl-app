import React, { useCallback } from 'react';

export const useFunction = (func, ...args) => useCallback(() => func(...args), [func, ...args]);