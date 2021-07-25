import React from 'react';
import { useTranslation } from 'react-i18next';
import database from '@react-native-firebase/database';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api';
import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';

export const ProfileView = ({ navigation }) => {
	const { userInfo } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const updateUserInfo = () => {
		const newInfo = {
			age: 31,
			name: 'Siauliai',
			city: 'SouthParkas'
		}
		dispatch(actions.user.updateUserInfo(newInfo))
	}

	return (
		<HomeWrap>
			<WelcomeTitle>Profile view!</WelcomeTitle>
			<View>
				<Text>Vardas: {userInfo && userInfo.name}</Text>
				<Text>Amzius: {userInfo && userInfo.age}</Text>
				<Text>Miestas: {userInfo && userInfo.city}</Text>
				<Text>Email: {userInfo && userInfo.email}</Text>
			</View>
			<Button
				title="Go to Profile Edit"
				onPress={() => navigation.navigate(ROUTES.ProfileEdit)}
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
