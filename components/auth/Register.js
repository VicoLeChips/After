import React, { Component } from 'react'
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Form } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

import firebase from 'firebase'
import "firebase/firestore";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordVerification: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { first_name, last_name, email, password, passwordVerification } = this.state;
        if(passwordVerification != password){  Alert.alert("Error", "The 2 passwords do not match"); return }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                
                //add to collection
                firebase.firestore().collection("users")
                    //By user ID
                    .doc(firebase.auth().currentUser.uid)
                    //All the parameter we want to save
                    .set({
                        first_name,
                        last_name,
                        email
                    })
                //console.log(result)
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
            })
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.logo}>AFTER</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="First name..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ first_name: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last name..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ last_name: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        autoCapitalize="none"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        autoCapitalize="none"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Re-enter your password..."
                        placeholderTextColor="#003f5c"
                        autoCapitalize="none"
                        onChangeText={text => this.setState({ passwordVerification: text })} />
                </View>
                <TouchableOpacity style={styles.signUpBtn} onPress={() => this.onSignUp()}>
                    <Text style={styles.signUpText}>REGISTER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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