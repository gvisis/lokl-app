import auth from '@react-native-firebase/auth';

const login = async (email, password) => {
	await auth().signInWithEmailAndPassword(email, password);
}

const getUserInfo = () => auth().currentUser;

export const api = {
	getUserInfo,
	login
}