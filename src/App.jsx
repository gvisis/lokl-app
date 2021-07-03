import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppProvider} from './state/context';
import {HomeView} from './containers/HomeFlow/HomeView';
import {
  RegisterView,
  LoginView,
  ForgotPasswordView,
} from './containers/LoginFlow';
import {Header, CustomBtn} from './components/';

const Stack = createStackNavigator();

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
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{title: 'It\'s coming home'}}
          />
          <Stack.Screen name="Register" component={RegisterView} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
