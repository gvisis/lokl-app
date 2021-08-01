import React, { useCallback, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { useFunction } from '../../utils/hooks';
import { CustomBtn } from '../../components';

export const ProfileView = ({ navigation }) => {
	const { userInfo } = useSelector(state => state.user)
	const { onSync } = useSelector(state => state.ui);
	const dispatch = useDispatch()
	const handleProfileEditNav = useFunction(navigation.navigate, ROUTES.ProfileEdit);

	const updateUserInfo = useCallback(() => {
		const updatedInfo = {
			age: 40
		}
		dispatch(actions.user.updateUserInfo(updatedInfo))
	}, []);

	useEffect(() => () => {
		dispatch(actions.ui.setOnSync('button', false))
	}, [userInfo.age])

	return (
		<HomeWrap>
			<WelcomeTitle>Profile view!</WelcomeTitle>
			<View>
				<Text>Name: {userInfo.name}</Text>
				<Text>Age: {userInfo.age}</Text>
				<Text>City: {userInfo.city}</Text>
				<Text>Email: {userInfo.email}</Text>
			</View>
			<Button
				title="Go to Profile Edit"
				onPress={handleProfileEditNav}
			/>
			<CustomBtn
				label={'Update info'}
				secondary
				center
				onPress={updateUserInfo}
				onSync={onSync.button}
			/>
		</HomeWrap>
	);
};

const HomeWrap = styled.View`
			flex: 1;
			`;

const WelcomeTitle = styled.Text`
			color: ${({ theme }) => theme.colors.primary};
			font-size: ${({ theme }) => theme.fonts.size.xl}px;
			text-align: center;
			padding: 10px;
			flex: 4;
			`;
