import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {actions} from '../../state/actions';
import {CustomBtn, Header} from '../../components';
import {theme} from '../../assets/theme/default';

const {colors} = theme;

export const HomeView = ({navigation, route}) => {
  const {t} = useTranslation();
  const userInfo = useSelector(state => state.user.userInfo);
  console.warn(userInfo);
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.warn(userInfo, 'User signed out!');
      })
      .catch(error => {
        console.error(error.code);
      });
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
