import auth from '@react-native-firebase/auth';

const login = async (email, password) =>
	auth().signInWithEmailAndPassword(email, password);

const logout = async () =>
	auth().signOut();

const register = async (email, password) => {
	auth().createUserWithEmailAndPassword(email, password)
}
const getUserInfo = () => auth().currentUser;

export const api = {
	getUserInfo,
	login,
	logout,
	register
}