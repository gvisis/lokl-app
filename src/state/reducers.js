import {constants} from './constants';
import auth from '@react-native-firebase/auth';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.app.GET_USER_EMAIL: {
      if (state.userEmail && state.userEmail !== '') {
        return state.userEmail;
      }
      return {...state};
    }
    case constants.app.LOGIN:
      const {email, password} = action.payload;
      if (email !== '' && password !== '') {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            return {...state, isLoggedIn: true, userEmail: email};
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
      } else {
        console.warn(`Login failed: ${email}`);
      }
      return {...state};

    case constants.app.LOGOUT:
      auth()
        .signOut()
        .then(() => {
          console.warn('User signed out!');
        })
        .catch(error => {
          console.error(error);
        });
      return {...state, isLoggedIn: false, userEmail: null};

    case constants.app.REGISTER: {
      const {email, password} = action.payload;
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.warn(email, 'created');
          return {...state, isLoggedIn: true, userEmail: email};
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            return {...state, isLoggedIn: false};
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            return {...state, isLoggedIn: false};
          }
        });
      return {...state};
    }
    case constants.app.PASSWORD_RESET: {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.warn(`Password reset email sent to ${usersEmail}`);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn(errorCode, errorMessage);
        });
    }
    default:
      return state;
  }
};

export default reducer;
