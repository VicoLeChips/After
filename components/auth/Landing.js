import React from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'

export default function Landing({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>AFTER</Text>
            <TouchableOpacity style={styles.landingBtn} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.landingText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.landingBtn} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.landingText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },
      landingBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      landingText:{
        color:"white"
      }
  });