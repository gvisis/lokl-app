import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppProvider, useGlobalContext} from './state/context';
import {LandingPageView} from './containers/LandingFlow';
import {HomeView} from './containers/HomeFlow/';
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
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (!user) {
  //   return (
  //     <View>
  //       <Header title="Login" />
  //       <TextInput
  //         onChangeText={setUserEmail}
  //         value={userEmail}
  //         placeholder={'Email'}
  //       />
  //       <TextInput
  //         onChangeText={setUserPassword}
  //         value={userPassword}
  //         placeholder={'Password'}
  //         secureTextEntry={false}
  //       />
  //       <CustomBtn
  //         text="Login"
  //         backgroundColor="green"
  //         onPress={signIn}
  //         center
  //         activeOpacity={0.5}
  //       />
  //     </View>
  //   );
  // }
  return (
    <AppProvider>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Landing" component={LandingPageView} />
          {/* <Stack.Screen name="Register" component={RegisterView} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
