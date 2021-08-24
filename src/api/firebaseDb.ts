import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import { api } from '.';
import { ImagesProps } from '../state/app/AppInterfaces';

const fetchAllAds = async () => {
  const currentUser = api.getUserInfo().uid;
  const adsRef = await database().ref(`/users/${currentUser}/ads/`);
  const ads = await adsRef.once('value').then(snap => snap.val());
  return ads;
};

const createAd = async (userId, adInfo) => {
  const newAdRef = await database().ref(`/users/${userId}/ads/`).push();
  await newAdRef.set(adInfo);
  return newAdRef.key;
};

const fetchCategories = async () => {
  const categoriesRef = await database().ref('/categories/');
  const categories = await categoriesRef.once('value').then(snap => snap.val());
  return categories;
};

const fetchAllCompanies = async () => {
  const companiesRef = await database().ref('/companies/');
  const companies = await companiesRef.once('value').then(snap => snap.val());
  return companies;
};

const uploadImageToStorage = (
  newAdKey: string,
  adId: string,
  imagesToUpload: ImagesProps[],
) => {
  console.log('upldimg', imagesToUpload);

  if (imagesToUpload.length != 0) {
    imagesToUpload.map(async tempImage => {
      const newImageName = `adImg_${tempImage.id}`;
      const currentUserId = api.getUserInfo().uid;

      // Get reference for the ad the image is going to be uploaded to
      const adDbRef = await database()
        .ref(`users/${currentUserId}/ads/`)
        .child(`${newAdKey}`);

      // Image ref for firebase storage
      const storageRef = await storage().ref(
        'images/ads/' + adId + '/' + newImageName,
      );

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
          //! UPDATES ONLY THE LAST IMAGE UPLOADED. HOW TO UPDATE OBJECT WITH ALL IMAGES?
          storageRef.getDownloadURL().then(url => {
            adDbRef.child('images').update({
              ...tempImage,
              url: url,
            });
          });
        },
      );
    });
  }
};

export const firebaseDb = {
  createAd,
  fetchAllAds,
  fetchAllCompanies,
  fetchCategories,
  uploadImageToStorage,
};
