import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Image, Button, TouchableOpacity, Text } from 'react-native'

//import firebase from 'firebase'
import 'firebase/firestore';

import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")
import { doc, setDoc } from "firebase/firestore"; 
import * as firebase from 'firebase'


export default function Save(props) {

    const uploadImage = async () => {
        const uri = props.route.params.image;

        //Each image uploaded is connected to a UID + a randomized name
        const childPath = `profilePicture/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                saveProfilePictureData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const saveProfilePictureData = (downloadURL) => {

        firebase.firestore()
            .collection('profilePictures')
            .doc(firebase.auth().currentUser.uid)
            .collection("userProfilePictures")
            .add({
                downloadURL,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))

            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({"picture": downloadURL})
    
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TouchableOpacity style={styles.btn} onPress={() => uploadImage()}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: 1
    },
    btn:{
      width:"100%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:10
    },
    text:{
      color:"white"
    }
  })