import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const capitalizeFirst = string => string.charAt(0).toUpperCase() + string.slice(1)


export const getHeaderTitle = route =>
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	getFocusedRouteNameFromRoute(route)
