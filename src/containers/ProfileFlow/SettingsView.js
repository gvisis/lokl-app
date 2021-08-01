import React, { useCallback, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ROUTES } from '../../routes/RouteNames';
import { actions } from '../../state/actions';
import { useFunction } from '../../utils/hooks';
import { CustomBtn, ThemeSwitch } from '../../components';

export const SettingsView = ({ navigation }) => {
	const { userInfo } = useSelector(state => state.user)
	const { onSync } = useSelector(state => state.ui);
	const dispatch = useDispatch()

	useEffect(() => () => {
		dispatch(actions.ui.setOnSync('button', false))
	}, [userInfo.age])


	return (
		<HomeWrap>
			{/* make as a list later on */}
			<SettingsFullRow iconName="paint-brush" rowTitle="Change theme:" />
			<SettingsFullRow iconName="language" rowTitle="Change language:" />
		</HomeWrap>
	);
};

const SettingsFullRow = ({ iconName, rowTitle }) => (
	<RowWrap>
		<IconWrap>
			<StyledIcon
				name={iconName}
			/>
		</IconWrap>
		<RowTitle>{rowTitle}</RowTitle>
		<SwitchWrap>
			<ThemeSwitch />
		</SwitchWrap>
	</RowWrap>
)
const HomeWrap = styled.View`
	flex: 1;
	width: 100%;
	margin-top: 5px;
`;

const RowWrap = styled.View`
	padding: 5px;
	flex-direction: row;
	align-items: center;
	width: 100%;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.lightGrey};
`
const RowTitle = styled.Text`
	font-size: ${({ theme }) => theme.fonts.size.xl}px;
	color: ${({ theme }) => theme.colors.black};
	margin: 0 10px;
	flex: 4;
`

const SwitchWrap = styled.View`
	flex: 1.5;
`

const IconWrap = styled.View`
	margin: 0 10px;
	padding: 10px;
	flex: 0.5;
	justify-content: center;
	align-items: center;
`
const StyledIcon = styled(Icon)`
	color: ${({ theme }) => theme.colors.secondaryBtn};
	font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
`
