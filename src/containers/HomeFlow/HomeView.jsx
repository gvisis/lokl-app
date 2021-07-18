import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../state/actions';
import { CustomBtn, Header, ScreenLoader } from '../../components';
import { theme } from '../../assets/theme/default';

const { colors } = theme;

export const HomeView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);

  const handleLogout = async () => {
    dispatch(actions.user.logout());
  };

  return (
    <View style={styles.container}>
      <Header title={t('home:title')} />
      <Text style={styles.textStyle}>Your email: {userInfo.email}!</Text>
      <CustomBtn
        text={t('common:Logout')}
        style={styles.logOutButton}
        activeOpacity={0.5}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutButton: {
    alignSelf: 'center',
    backgroundColor: colors.secondaryBtn,
    bottom: 15,
    marginLeft: 'auto',
    position: 'absolute',
  },
});
