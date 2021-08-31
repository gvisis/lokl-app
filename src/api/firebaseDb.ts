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

const fetchAllCompanies = async (): Promise<CompanyProps[]> => {
  const companiesRef = await database().ref('/companies/');
  const companies = await companiesRef.once('value').then(snap => snap.val());
  return companies;
};

const updateCompany = async (companyData: CompanyProps) => {
  const companyRef = await database().ref(`/companies/${companyData.id}`);
  await companyRef.update(companyData);
};

const updateProduct = async (productData: CompanyProduct) => {
  const productRef = await database().ref(
    `/companies/${productData.owner}/produce/`,
  );
  await productRef.set([productData]);
};

const uploadImageToStorage = async (
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
      const storagePut = storageRef.putFile(tempImage.url);

      // make it pretty later, with loading state
      // Catch error and if success, update ad object with link to images.
      storagePut.on(
        'state_changed',
        taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        },
        err => {
          console.log('Upload error:', err);
        },
        () => {
          storagePut.snapshot.ref.getDownloadURL().then(downloadURL => {
            // Update ad object with link to images
            adDbRef.child(adDbRefKey).set(downloadURL);
          });
        },
      );
    });
  }
};

export const firebaseDb = {
  createAd,
  fetchAllAds,
  updateCompany,
  updateProduct,
  fetchAllCompanies,
  fetchDefaultImage,
  fetchCategories,
  uploadImageToStorage,
};
