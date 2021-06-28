import React, {useState, useEffect, useRef, Component} from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants'
//Library to make API call
import axios from 'axios'
//Call Topbar from "components" folder
import TopBar from './components/main/TopBar'
//Call Image from "components" folder
import SwipeableImage from './components/main/SwipeableImage'
//Call BottomBar from "components" folder
import BottomBar from './components/main/BottomBar'
//Call Login from "components" folder
import Login from './components/auth/Login'
import Swipes from  './components/main/Swipes'
import * as firebase from 'firebase'
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
//import auth from '@react-native-firebase/auth';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/Main'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0heD3zThDsdyfzffRiJd5DSYAJjzJynY",
  authDomain: "after-2647d.firebaseapp.com",
  projectId: "after-2647d",
  storageBucket: "after-2647d.appspot.com",
  messagingSenderId: "1067962438422",
  appId: "1:1067962438422:web:793198d36cb8b297153637",
  measurementId: "G-9LKYCPZVJV"
};

// Prevent to run 2 firebase instances at the same time (the app would crash otherwise)
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();


export default function App() 
{
 

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

/*
  this.state = {
    loaded: false,
  }*/



  /*
  firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  

  checkIfConnected()*/

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }


  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(subscriber)
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return null;

   //console.log("Is the user already connected ?")
   //console.log(!initializing)
  //console.log(user)
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      /*<Provider store={store}>
        <View style={styles.container}>
          <TopBar />
          <View style={styles.swipes}>
            {users.length > 1 &&
              users.map((u, i) =>
                currentIndex === i && (
                  <Swipes
                    key={i}
                    ref={swipesRef}
                    currentIndex={currentIndex}
                    users={users}
                    handleLike={handleLike}
                    handlePass={handlePass}>
                  </Swipes>))
            }
          </View>
          <BottomBar handleUndoPress={handleUndoPress} handleLikePress={handleLikePress} handlePassPress={handlePassPress} />
        </View>
      </Provider>*/
      <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      </SafeAreaProvider>

    );
  }
}

