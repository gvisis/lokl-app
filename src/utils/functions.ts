import i18next from 'i18next';
import { Asset } from 'react-native-image-picker';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ROUTES } from '../routes/RouteNames';
import {
  AdsProps,
  CompanyProduct,
  CompanyProps,
  RatingData,
} from '../state/app/AppInterfaces';
import { AnyObject } from '../types/general';
import { TAB_ICONS } from './variables';

export const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const sortAsc = (a: string, b: string) => a.localeCompare(b);
export const sortDesc = (a: string, b: string) => b.localeCompare(a);

export const guidGenerator = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const getSearchFilteredResults = (
  products: CompanyProduct[],
  companies: CompanyProps[],
  ads: AdsProps[],
  searchValue: string,
) => {
  let searchResults: AnyObject[] = [];

  if (searchValue !== '') {
    const filteredProducts = products.filter(
      product =>
        product.title.includes(searchValue) ||
        product.description.includes(searchValue),
    );
    const filteredCompanies = companies.filter(
      company =>
        company.title.includes(searchValue) ||
        company.description.includes(searchValue),
    );
    const filteredAds = ads.filter(
      ad =>
        ad.title.includes(searchValue) || ad.description.includes(searchValue),
    );
    searchResults = [...filteredProducts, ...filteredCompanies, ...filteredAds];
  } else {
    searchResults = [];
  }
  return searchResults;
};

export const getCategoryItemsFromIds = (
  companies: CompanyProps[],
  categoryId: string,
) =>
  companies
    .map(company => company['produce'])
    .flat()
    .filter(product => product.category === categoryId);

export const getFormatedPrice = (price: string) =>
  new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'EUR',
  }).format(parseFloat(price));

export const getImagesFromObject = (item: ImagesFromObject) => {
  const imgArray = [];
  for (const key in item.images) {
    imgArray.push({ id: key, url: item.images[key] });
  }
  return imgArray;
};

export const getProductOwnerTitle = (
  allCompanies: CompanyProps[],
  item: CompanyProduct,
): string =>
  allCompanies
    .filter(company => company.id === item.owner)
    .map(company => company.title)[0];

export const calcRatingAverage = (ratings: RatingData[]) =>
  ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

export type CheckForRatings = CompanyProduct | CompanyProps;

export const checkForRatings = (
  ratedItem: CheckForRatings,
  ratingData: RatingData,
) => {
  const { id, rating } = ratingData;
  let updatedData;

  // Check if rating from that user already exist
  const isRatingExist = ratedItem.ratings.find(item => item.id === id);

  if (ratedItem.ratings && ratedItem.ratings.length !== 0) {
    // If rating exist, update rating
    if (isRatingExist) {
      updatedData = ratedItem.ratings.map(item => {
        if (item.id === id) {
          item.rating = rating;
        }
        return ratedItem;
      })[0];
      // If rating doesn't exist, add rating
    } else {
      updatedData = {
        ...ratedItem,
        ratings: [...ratedItem.ratings, ratingData],
      };
    }
    // If no ratinga exist, add first rating
  } else {
    updatedData = { ...ratedItem, ratings: [ratingData] };
  }
  return updatedData;
};

export const getHeaderTitle = (routeName: string) => {
  switch (routeName) {
    case ROUTES.Profile:
      return i18next.t('profile:title');
    case ROUTES.ProfileEdit:
      return i18next.t('profile:editProfile');
    case ROUTES.Settings:
      return i18next.t('profile:settings');
    case ROUTES.Home:
      return i18next.t('home:home');
    case ROUTES.Cart:
      return i18next.t('cart:shoppingCart');
    case ROUTES.Address:
      return i18next.t('profile:addresses');
    case ROUTES.AddAddress:
      return i18next.t('common:addNewAddress');
    default:
      return i18next.t('home:home');
  }
};

export const getTabLabel = (routeName: string) => {
  switch (routeName) {
    case ROUTES.HomeTab:
      return capitalizeFirst(ROUTES.Home);
    case ROUTES.AdsTab:
      return capitalizeFirst(ROUTES.Ads);
    case ROUTES.Profile:
      return capitalizeFirst(ROUTES.Profile);
    case ROUTES.CartTab:
      return capitalizeFirst(ROUTES.Cart);
    default:
      return capitalizeFirst(ROUTES.Home);
  }
};
export const getTabIconName = (routeName: string) => {
  switch (routeName) {
    case ROUTES.HomeTab:
      return TAB_ICONS.Home;
    case ROUTES.AdsTab:
      return TAB_ICONS.Tag;
    case ROUTES.Profile:
      return TAB_ICONS.User;
    case ROUTES.CartTab:
      return TAB_ICONS.Cart;
    default:
      return TAB_ICONS.Home;
  }
};

export const getImageObject = (assets: Asset[]) => {
  const imageUrl = assets[0].uri;
  const imageId = assets[0].uri.split('temp_')[1].split('.jpg')[0];
  return { url: imageUrl, id: imageId };
};

export const getDateFromString = (date: string) => {
  const parsedDate = Date.parse(date);
  const dateISO = new Date(parsedDate);
  return dateISO.toLocaleDateString();
};
