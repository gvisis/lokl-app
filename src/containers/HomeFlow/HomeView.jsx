import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, CustomBtn} from '../../components';
import {useGlobalContext} from '../../state/context';
import {theme} from '../../assets/theme/default';
import { useTranslation } from 'react-i18next';
const {colors} = theme;

export const HomeView = ({navigation, route}) => {
  const {handleLogout, getUserEmail} = useGlobalContext();
  const {t} = useTranslation();
  // console.warn(getUserEmail(), 'homeview'); // render loops

  return (
    <View style={styles.container}>
      <Header title={t('home:title')}/>
      <Text style={styles.textStyle}>Your email: not working...!</Text>
      <CustomBtn
        text={t('common:Logout')}
        style={styles.logOutButton}
        onPress={handleLogout}
        activeOpacity={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutButton: {
    position: 'absolute',
    bottom: 15,
    marginLeft: 'auto',
    backgroundColor: colors.secondaryBtn,
    alignSelf: 'center',
  },
});
