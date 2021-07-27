import React, { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { useFunction } from '../../utils/hooks';

export const ProfileView = ({ navigation }) => {
	const { userInfo } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const handleProfileEditNav = useFunction(navigation.navigate, ROUTES.ProfileEdit);

	const updateUserInfo = useCallback(() => {
		const updatedInfo = {
			age: 40,
			name: 'Rocky',
			city: 'London'
		}
		dispatch(actions.user.updateUserInfo(updatedInfo))
	}, []);

	return (
		<HomeWrap>
			<WelcomeTitle>Profile view!</WelcomeTitle>
			<View>
				<Text>Name: {userInfo && userInfo.name}</Text>
				<Text>Age: {userInfo && userInfo.age}</Text>
				<Text>City: {userInfo && userInfo.city}</Text>
				<Text>Email: {userInfo && userInfo.email}</Text>
			</View>
			<Button
				title="Go to Profile Edit"
				onPress={handleProfileEditNav}
			/>
			<Button
				title="update info"
				onPress={updateUserInfo}
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
