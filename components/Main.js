import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { View, Text, StyleSheet  } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import * as firebase from 'firebase'
import FeedScreen from './main/SwipeableImage'
import ChatScreen from './main/Chat'
import ProfileScreen from './main/Profile'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const Tab = createMaterialTopTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        const {currentUser} = this.props;

        if(currentUser == undefined)
        {
            return(
                <View>
                    <Text>Page is loading</Text>
                </View>
            )
        }
        return (

            /*<MaterialCommunityIcons name="party-popper" size={27} color="#F06795"/>
            <FontAwesome name="comments" size={27} color="#5c5c5c"/>
            <FontAwesome name="user" size={27} color="#5c5c5c"}/>*/
            /*<View>
                <Text>{currentUser.name} is logged in</Text>
            </View>*/
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <Tab.Navigator initialRouteName="Feed"
                    tabBarOptions={{
                        showLabel: false,
                        style: { backgroundColor: 'orange' },
                        showIcon: true,
                        shifting: true,
                        activeTintColor: 'red',
                        inactiveTintColor: 'grey',
                        activeColor: 'white'
                    }}>
                    <Tab.Screen name="Feed" component={FeedScreen} options={{
                        activeTintColor: 'green',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="party-popper" color={color} size={26} />
                        )
                    }} />
                    <Tab.Screen name="Chat" component={ChatScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="comments" color={color} size={26} />
                        )
                    }} />
                    <Tab.Screen name="Profile" component={ProfileScreen}
                        listeners={({ navigation }) => ({
                            tabPress: event => {
                                event.preventDefault();
                                console.log(firebase.auth().currentUser.uid)
                                navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
                            }
                        })}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="user" color={color} size={26} />
                            )
                        }} />

                </Tab.Navigator>
            </SafeAreaView>

        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);