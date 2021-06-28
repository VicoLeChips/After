import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Profile(props) {
    /*const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
        }

    }, [props.route.params.uid])

*/
    const onLogout = () => {
        firebase.auth().signOut();
    }
    /*console.log("/////////////////////////")
    console.log(props.currentUser.name)*/
   /* if (user === null) {
        return <View />
    }*/
    return (
     
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{props.currentUser.name}</Text>
                <Text>{props.currentUser.email}</Text>
                <Button
                        title="Logout"
                        onPress={() => onLogout()}
                    />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Profile);