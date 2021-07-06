import {constants} from './constants';
import auth from '@react-native-firebase/auth';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.app.LOG_IN:
      const {email, password} = action.payload;
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
      return {...state, isLoggedIn: true};
    case constants.app.LOG_OUT:
      auth()
        .signOut()
        .then(() => {
          console.warn('User signed out!');
        })
        .catch(error => {
          console.error(error);
        });
      return {...state, isLoggedIn: false};
    default:
      return state;
  }
};

export default reducer;
