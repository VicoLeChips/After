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
import { View, Button, TextInput } from 'react-native'

import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
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
                />
            </View>
        )
    }
}

export default Login