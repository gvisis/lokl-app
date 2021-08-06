import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type ApiProps = (
  email: string,
  password: string,
) => Promise<FirebaseAuthTypes.UserCredential>;

const login: ApiProps = async (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

const logout = async (): Promise<void> => auth().signOut();

const signup: ApiProps = async (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

const passworReset = async (email: string): Promise<void> =>
  auth().sendPasswordResetEmail(email);

const getUserInfo = () => auth().currentUser;

export const api = {
  getUserInfo,
  login,
  logout,
  signup,
  passworReset,
};
