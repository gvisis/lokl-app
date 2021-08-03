import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const login = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().signInWithEmailAndPassword(email, password);

const logout = async (): Promise<void> => auth().signOut();

const register = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().createUserWithEmailAndPassword(email, password);

const passworReset = async (email: string): Promise<void> =>
  auth().sendPasswordResetEmail(email);

const getUserInfo = () => auth().currentUser;

export const api = {
  getUserInfo,
  login,
  logout,
  register,
  passworReset,
};
