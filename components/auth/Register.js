import React, { Component } from 'react'
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import firebase from 'firebase'
import "firebase/firestore";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                //add to collection
                firebase.firestore().collection("users")
                    //By user ID
                    .doc(firebase.auth().currentUser.uid)
                    //All the parameter we want to save
                    .set({
                        name,
                        email
                    })
                //console.log(result)
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>AFTER</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Name..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ name: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>

                <TouchableOpacity style={styles.signUpBtn} onPress={() => this.onSignUp()}>
                    <Text style={styles.signUpText}>REGISTER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white"
      },
      signUpBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      signUpText:{
        color:"white"
      }
  });

export default Register