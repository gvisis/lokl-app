import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { ROUTES } from '../routes/RouteNames';

export const capitalizeFirst = string => string.charAt(0).toUpperCase() + string.slice(1)

export const getHeaderTitle = route => {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route)
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
			return 'Home'
	}
}
