import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import {
  AdsProps,
  Category,
  CompanyProduct,
  CompanyProps,
  ImagesProps,
} from '../state/app/AppInterfaces';
import { api } from '.';
import { UserProps } from '../state/user/UserInterfaces';
import storeRegistry from '../utils/redux/storeRegistry';

const fetchAllAds = async (): Promise<AdsProps> => {
  const currentUser = api.getUserInfo().uid;
  const adsRef = await database().ref(`/users/${currentUser}/ads/`);
  const ads = await adsRef.once('value').then(snap => snap.val());
  return ads;
};

const createAd = async (userId: string, adInfo: AdsProps): Promise<string> => {
  const newAdRef = await database().ref(`/users/${userId}/ads/`).push();
  await newAdRef.update(adInfo);
  return newAdRef.key;
};

const fetchDefaultImage = async (): Promise<string> => {
  const defaultImageRef = await storage()
    .ref(`/images/ads/default.png`)
    .getDownloadURL();
  return defaultImageRef;
};

const fetchCategories = async (): Promise<Category> => {
  const categoriesRef = await database().ref('/categories/');
  const categories = await categoriesRef.once('value').then(snap => snap.val());
  return categories;
};

const updateCompany = async (companyData: CompanyProps) => {
  const companyRef = await database().ref(`/companies/${companyData.id}`);
  await companyRef.update(companyData);
};

const updateUser = async (userData: UserProps) => {
  const currentUserId = api.getUserInfo().uid;
  const userRef = await database().ref(`/users/${currentUserId}`);
  await userRef.update(userData);
};

const fetchAdOwnerDetails = async (ownerId: string) => {
  const userRef = await database().ref(`/users/${ownerId}`);
  const user = await userRef.once('value').then(snap => snap.val());
  return user;
};

const updateProduct = async (productData: CompanyProduct) => {
  const productRef = await database().ref(
    `/companies/${productData.owner}/produce/`,
  );
  await productRef.set([productData]);
};

const uploadAdImagesToStorage = async (
  newAdKey: string,
  imagesToUpload: ImagesProps[],
) => {
  const currentUserId = api.getUserInfo().uid;
  if (imagesToUpload.length !== 0) {
    // Get reference for the ad the image is going to be uploaded to
    const adDbRef = await database().ref(
      `users/${currentUserId}/ads/${newAdKey}/images/`,
    );
    imagesToUpload.map(async tempImage => {
      // Image ref for firebase storage
      const adImageName = `adImg_` + tempImage.id;
      const storageRef = await storage().ref(
        'images/ads/' + newAdKey + '/' + adImageName,
      );
      const adDbRefKey = adDbRef.push().key;

      // Upload image to firebase storage
      await storageRef.putFile(tempImage.url);

      // Get download Url for the image
      const downloadUrl = await storageRef.getDownloadURL();

      // Update the adDbRef with the image url
      await adDbRef.child(adDbRefKey).set(downloadUrl);
    });
  }
};

export const firebaseDb = {
  createAd,
  fetchAllAds,
  updateCompany,
  updateUser,
  updateProduct,
  fetchDefaultImage,
  fetchCategories,
  fetchAdOwnerDetails,
  uploadAdImagesToStorage,
};
