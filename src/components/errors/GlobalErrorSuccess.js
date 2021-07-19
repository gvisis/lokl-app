import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../state/actions';


export const GlobalErrorSuccess = ({ navigation }) => {
	const { error, success, message } = useSelector(state => state.ui.status);
	const errorType = error ? 'error' : success ? 'success' : null;
	const dispatch = useDispatch()

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
	return (
		<>
			{errorType && <Toast ref={ref => Toast.setRef(ref)} />}
		</>

	)
}

