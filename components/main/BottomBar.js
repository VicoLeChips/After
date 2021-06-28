import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

export default function BottomBar({handleUndoPress, handleLikePress, handlePassPress}) {
    return ( 
        <View style={styles.container}>
            <TouchableOpacity /*style={styles.button}*/>
                <FontAwesome name="undo" size={35} color="#5c5c5c" onPress={handleUndoPress}/>
            </TouchableOpacity>
            <TouchableOpacity /*style={styles.button}*/>
                <FontAwesome name="times" size={40} color="#F06795" onPress={handlePassPress}/>
            </TouchableOpacity>
            <TouchableOpacity /*style={styles.button}*/>
                <MaterialCommunityIcons name="party-popper" size={37} color="#64EDCC"  onPress={handleLikePress}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button:
    {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset:
        {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.46,
        elevation: 9,

    }
})