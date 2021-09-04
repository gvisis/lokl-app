import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import { ROUTES } from './RouteNames';
import { ProductView } from '../containers/ProductFlow';
import { CompanyView, CompCategoryView } from '../containers/CompanyFlow';
import { CategoriesView } from '../containers/HomeFlow';
import { RootStackParamList } from '../types/general';
import { TabNavigation } from '.';
import { AddAdView, AdsView, SingleAdView } from '../containers/AdsFlow';
import {
  AddEditAddressView,
  AddressView,
  ProfileEditView,
  ProfileView,
  SettingsView,
} from '../containers/ProfileFlow';

const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeNavigation: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontFamily: theme.fonts.family.bentonBook,
          textTransform: 'capitalize',
        },
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen
        name={ROUTES.TabNav}
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={ROUTES.SingleProduct} component={ProductView} />
      <HomeStack.Screen name={ROUTES.SingleCompany} component={CompanyView} />
      <HomeStack.Screen
        name={ROUTES.SingleCategory}
        component={CategoriesView}
      />
      <HomeStack.Screen
        name={ROUTES.CompanyCategory}
        component={CompCategoryView}
      />
      <HomeStack.Screen
        name={ROUTES.Ads}
        component={AdsView}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name={ROUTES.AddAd}
        component={AddAdView}
        options={{ headerTitle: t('ads:createNew') }}
      />
      <HomeStack.Screen name={ROUTES.SingleAdView} component={SingleAdView} />
      <HomeStack.Screen
        name={ROUTES.Profile}
        component={ProfileView}
        options={{ headerTitle: t('profile:title') }}
      />
      <HomeStack.Screen
        name={ROUTES.ProfileEdit}
        component={ProfileEditView}
        options={{ headerTitle: t('profile:editProfile') }}
      />
      <HomeStack.Screen
        name={ROUTES.Address}
        component={AddressView}
        options={{ headerTitle: t('profile:addresses') }}
      />
      <HomeStack.Screen
        name={ROUTES.AddAddress}
        component={AddEditAddressView}
        options={{ headerTitle: t('common:addNewAddress') }}
      />
      <HomeStack.Screen
        name={ROUTES.Settings}
        component={SettingsView}
        options={{ headerTitle: t('profile:settings') }}
      />
    </HomeStack.Navigator>
  );
};
