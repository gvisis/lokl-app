import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeView} from './containers/HomeFlow/HomeView';

import {Header, CustomBtn} from './components/';

import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        console.log('User signed in!');
        setUserEmail('');
        setUserPassword('');
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
  };

  if (!user) {
    return (
      <View>
        <Header title="Login" />
        <TextInput
          onChangeText={setUserEmail}
          value={userEmail}
          placeholder={'Email'}
        />
        <TextInput
          onChangeText={setUserPassword}
          value={userPassword}
          placeholder={'Password'}
          secureTextEntry={false}
        />
        <CustomBtn
          text="Login"
          backgroundColor="green"
          onPress={signIn}
          center
          activeOpacity={0.5}
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {/* <LoginView /> */}
      {/* <LandingPageView /> */}
      <HomeView userEmail={user.email} />
      {/* <ForgotPasswordView /> */}
      {/* <RegisterView /> */}
    </NavigationContainer>
  );
}

export default App;
