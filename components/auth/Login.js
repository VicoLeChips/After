/*import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native';

export default function Login() {
    return (
        <View style={styles.container} onPress = {() => console.log("Perssed")} >
            <Form>
                <Item>
                    <Label>Email</Label>
                    <Input 
                    autoCorrect={false}
                    autoCapitalize="none"/>
                </Item>
                <Item>
                    <Label>Password</Label>
                    <Input
                    secureTextEntry={true} 
                    autoCorrect={false}
                    autoCapitalize="none"/>
                </Item>

                <Button style={{marginTop: 10}}>
                    <Text>Login</Text>
                </Button>
            </Form>
        </View>        
    )
}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 10,
    }
})
*/ 

import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'

import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showAlert: false,
        }


        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                //console.log(result)
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
            })
    }

    render() {
        /*<View style={styles.container}>
                
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign In"
                    style={styles.loginBtn}
                />*/
                const { navigation } = this.props;

        return (

            <View style={styles.container}>
                <Text style={styles.logo}>AFTER</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.onSignIn()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.loginText}>Signup</Text>
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
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
        color:"white"
      }
  });

export default Login