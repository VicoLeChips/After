import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Dimensions  } from 'react-native'
import {Ionicons, Entypo, FontAwesome5  } from '@expo/vector-icons'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

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
    /*
    return(
        <View style={styles.container}>
            <View style={styles.containerInfo}>
            <Text>Nom : {props.currentUser.name}</Text>
            <Text>Mail : {props.currentUser.email}</Text>
            <Text>Age : {props.currentUser.age}</Text>
            <Text>Location : {props.currentUser.location}</Text>

            <Button
                        title="Logout"
                        onPress={() => onLogout()}
                    />
                                </View>
        </View>
    )*/
    const _menu = null;

    return (

        //Grey Background
        <ImageBackground
            source={require("../../assets/greyBackground.png")}
            style={styles.backgroundImg}>

            {/* User's Profile */}
            <ScrollView style={styles.containerProfile}>

                {/* User's picture */}
                <ImageBackground source={require("../../assets/man.jpg")} style={styles.photo}>

                    {/* Three dotted line (top right for more option) */}
                    <View style={styles.top}>
                        <TouchableOpacity>
                            <Ionicons
                                name="ellipsis-vertical"
                                size={20}
                                color="white"
                                style={styles.topIconRight} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Container under profile picture */}
                <View style={styles.containerProfileItem}>

                    {/* First name - Last Name */}
                    <Text style={styles.name}>{props.currentUser.first_name} {props.currentUser.last_name}</Text>

                    {/* Age - Location */}
                    <Text style={styles.descriptionProfileItem}>
                        {props.currentUser.age} ans - {props.currentUser.location}
                    </Text>

                    {/* Personal Info */}
                    <View style={styles.info}>
                        <Text style={styles.iconProfile}>
                            <Ionicons name="person" size={12} color={"grey"} />
                        </Text>
                        <Text style={styles.infoContent}>{props.currentUser.personalInfo}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.iconProfile}>
                            <Entypo name="info" size={12} color={"grey"} />
                        </Text>
                        <Text style={styles.infoContent}>{props.currentUser.interest}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.iconProfile}>
                            <FontAwesome5 name="hashtag" size={12} color={"grey"} />
                        </Text>
                        <Text style={styles.infoContent}>{props.currentUser.hashtag}</Text>
                    </View>
                </View>

                <Button
                    title="Logout"
                    onPress={() => onLogout()}
                />
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    containerProfileItem: 
    {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingBottom: 25,
        margin: 20,
        borderRadius: 8,
        marginTop: -65,
        elevation: 1,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOffset: 
        { 
            height: 0, 
            width: 0 
        },
    },
    containerInfo: 
    {
        margin: 20
    },
    backgroundImg: 
    {
        flex: 1,
        resizeMode: "cover",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    containerProfile: 
    { 
        marginHorizontal: 0 
    },
    photo: 
    {
        width: Dimensions.get("window").width,
        height: 450,
    },
    top: 
    {
        paddingTop: 20,
        justifyContent: "flex-end",
        display: 'flex'
    }, 
    topIconRight: 
    {
        paddingLeft:  Dimensions.get("window").width - 40, //Not efficient at all, but too lazy to fix. Should work though with style="display: flex; justify-content: flex-end"
    },
    descriptionProfileItem: 
    {
        color: 'grey',
        textAlign: "center",
        paddingBottom: 20,
        fontSize: 13,
    },
    infoContent: 
    {
        color: 'grey',
        fontSize: 13,
    },
    name: 
    {
        paddingTop: 25,
        paddingBottom: 5,
        color: "darkgrey",
        fontSize: 15,
        textAlign: "center",
    },
    iconProfile: 
    {
        fontSize: 12,
        color: "darkgrey",
        paddingHorizontal: 10,
    },
    info: 
    {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})


export default connect(mapStateToProps, null)(Profile);