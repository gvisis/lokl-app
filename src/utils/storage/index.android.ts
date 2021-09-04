//! ERROR: Exported variable 'storage' has or is using name 'Options' from external module "redux-persist-filesystem-storage" but cannot be named.
// import FilesystemStorage from 'redux-persist-filesystem-storage';

// export const storage = FilesystemStorage;
import AsyncStorage from '@react-native-community/async-storage';

export const storage = AsyncStorage;
