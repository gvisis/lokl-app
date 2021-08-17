import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../state/actions';

type ErrorType = 'error' | 'success' | null;

export const GlobalErrorSuccess: React.FC = () => {
  const { error, success, message } = useSelector(state => state.ui.status);

  let errorType: ErrorType = null;

  if (error) {
    errorType = 'error';
  }
  if (success) {
    errorType = 'success';
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorType) {
      Toast.show({
        type: errorType,
        text1: message,
        autoHide: true,
        visibilityTime: 4000,
        onHide: () => dispatch(actions.ui.clearErrors()),
      });
    }
  }, [errorType]);

  return <>{errorType && <Toast ref={ref => Toast.setRef(ref)} />}</>;
};
