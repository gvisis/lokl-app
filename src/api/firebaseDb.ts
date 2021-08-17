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
};

const uploadImageToStorage = (adId: string, images: ImagesProps[]) => {
  const tempImageUrls: string[] = [];
  if (images.length != 0) {
    images.map(async tempImage => {
      const newImageName = `adImg_${tempImage.id}`;
      const storageRef = await storage().ref(
        'images/ads/' + adId + '/' + newImageName,
      );
      const storagePut = storageRef.putFile(tempImage.url);
      tempImageUrls.push(await storageRef.getDownloadURL());
      // make it pretty later, with loading state
      storagePut.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      storagePut.then(() => {
        console.log('Image uploaded to the bucket!');
      });
    });
    return tempImageUrls;
  }
};

export const firebaseDb = {
  createAd,
  fetchAllAds,
  uploadImageToStorage,
};
