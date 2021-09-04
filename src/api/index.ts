import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { ApiProps } from '../types/general';

const login: ApiProps<FirebaseAuthTypes.UserCredential> = async (
  email,
  password,
) => auth().signInWithEmailAndPassword(email, password);

const logout = async (): Promise<void> => auth().signOut();

export interface AuthInterface {
  email: string;
  password: string;
}

const signup: ApiProps<string> = async (email, password) => {
  const key = (await auth().createUserWithEmailAndPassword(email, password))
    .user.uid;
  return key;
};

const passworReset: ApiProps<void> = async (email: string) =>
  auth().sendPasswordResetEmail(email);

const getUserInfo = () => auth().currentUser;

export const api = {
  getUserInfo,
  login,
  logout,
  signup,
  passworReset,
};
