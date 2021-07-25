import React from 'react';
import { useTranslation } from 'react-i18next';
import database from '@react-native-firebase/database';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import { api } from '../../api';
import { ROUTES } from '../../routes/RouteNames';

export const ProfileView = ({ navigation }) => {
	const { userInfo } = useSelector(state => state.user)

	const updateUserInfo = async () => {
		try {
			const userId = await api.getUserInfo().uid;
			const newInfo = {
				age: 35,
				name: 'Gvidas',
				city: 'Vilnius'
			}
			await database()
				.ref(`users/${userId}`)
				.update(newInfo)
		} catch (error) {
			console.log(error);
		}
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
