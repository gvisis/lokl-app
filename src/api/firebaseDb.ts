import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import { ImagesProps } from '../state/app/AppInterfaces';

const fetchAllAds = async (): Promise<void> => {
  const adsRef = await database().ref(`/ads/`);
  const ads = await adsRef.once('value').then(snap => snap.val());
  return ads;
};

const createAd = async (adInfo): Promise<void> => {
  const newAdRef = await database().ref('/ads').push();
  await newAdRef.set(adInfo).then(() => {
    console.log('newAd', adInfo);
  });
};

const uploadImageToStorage = (adId: string, images: ImagesProps[]) => {
  if (images.length != 0) {
    images.map(async tempImage => {
      const newImageName = `adImg_${tempImage.id}`;
      const storageRef = await storage().ref(
        'images/ads/' + adId + '/' + newImageName,
      );
      const storagePut = storageRef.putFile(tempImage.url);
      storagePut.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      storagePut.then(() => {
        console.log('Image uploaded to the bucket!');
      });
    });
  }
};

export const firebaseDb = {
  createAd,
  fetchAllAds,
  uploadImageToStorage,
};
