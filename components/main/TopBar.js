import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import * as firebase from 'firebase'

export default function TopBar() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="party-popper" size={27} color="#F06795"/>
            <FontAwesome name="comments" size={27} color="#5c5c5c"/>
            <FontAwesome name="user" size={27} color="#5c5c5c" onPress= {() => signOut() }/>
        </View>
    )
}

function signOut()
{
    console.log("Sign out button has been pressed")
    firebase.auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}

const styles = StyleSheet.create({
    container:
    {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset:
        {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,
    },
})