import { number } from 'prop-types';

import { Company } from '../components';
import { ROUTES } from '../routes/RouteNames';
import {
  CompanyProduct,
  CompanyProps,
  RatingData,
} from '../state/app/AppInterfaces';
import { AnyObject } from '../types/general';

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

export const getProductOwnerTitle = (
  allCompanies: CompanyProps[],
  product: CompanyProduct,
): string =>
  allCompanies
    .filter(company => company.id === product.owner)
    .map(company => company.title)[0];

export const calcRatingAverage = (ratings: RatingData[]) =>
  ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

export const checkForRatings = (
  ratedItem: AnyObject,
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
    console.log('updated data false', updatedData);
    updatedData = { ...ratedItem, ratings: [ratingData] };
  }
  return updatedData;
};

export const getHeaderTitle = routeName => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Home" as that's the first screen inside the navigator
  switch (routeName) {
    case ROUTES.Profile:
      return 'Profile';
    case ROUTES.ProfileEdit:
      return 'Edit Profile';
    case ROUTES.Settings:
      return 'Settings';
    case ROUTES.Home:
      return 'Home';
    case ROUTES.Cart:
      return 'Shopping Cart';
    case ROUTES.Address:
      return 'Addresses';
    case ROUTES.AddAddress:
      return 'Add new address';
    default:
      return 'Home';
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
      return 'home';
    case ROUTES.AdsTab:
      return 'tag';
    case ROUTES.Profile:
      return 'user';
    case ROUTES.CartTab:
      return 'shopping-cart';
    default:
      return 'home';
  }
};

export const getImageObject = assets => {
  const imageUrl = assets[0].uri;
  const imageId = assets[0].uri.split('temp_')[1].split('.jpg')[0];
  return { url: imageUrl, id: imageId };
};
