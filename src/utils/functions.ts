import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import { ROUTES } from '../routes/RouteNames';

export const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const sortAsc = (a: string, b: string) => a.localeCompare(b);
export const sortDesc = (a: string, b: string) => b.localeCompare(a);

export const getHeaderTitle = (route: Partial<Route<string, object>>) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Home" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case ROUTES.Profile:
      return 'Profile';
    case ROUTES.ProfileEdit:
      return 'Profile edit';
    case ROUTES.Settings:
      return 'Settings';
    case ROUTES.Home:
      return 'Home';
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
    default:
      return 'home';
  }
};
// not f working
export const pickImage = () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 800,
    maxHeight: 600,
  };
  launchImageLibrary(options, ({ didCancel, errorMessage, assets }) => {
    if (didCancel) {
      const pickError = 'User cancelled image picker';
    }
    if (assets) {
      const imageUrl = assets[0].uri;
      const imageId = assets[0].uri.split('temp_')[1].split('.jpg')[0];
      const tempImage = { url: imageUrl, id: imageId };
      return tempImage;
    }
    if (errorMessage) {
      const pickError = errorMessage;
    }
  });
  console.log(launchImage);
};
