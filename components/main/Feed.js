import React, {useState, useEffect, useRef, Component} from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
//Library to make API call
import axios from 'axios'
//Call Topbar from "components" folder
import TopBar from './TopBar'
//Call Image from "components" folder
import SwipeableImage from './SwipeableImage'
//Call BottomBar from "components" folder
import BottomBar from './BottomBar'
//Call Login from "components" folder
import Swipes from  './Swipes'

export default function Feed() {

  const [users, setUsers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0) 
  
  const swipesRef = useRef(null)

  async function fetchUsers() 
  {
    try
    {
      const {data} = await axios.get('https://randomuser.me/api/?gender=female&results=50')
      setUsers(data.results)
    }
    catch (error)
    {
      //Show button to try again if the API fail
      Alert.alert('Error getting users', '', [{text: 'Retry', onPress: () => fetchUsers()}])
    }
  }

  useEffect(() =>
  {
    fetchUsers()
  }, [])

  function  handleLike()
  {
    nextUser()
  }

  function  handlePass()
  {
    nextUser()
  }

  function nextUser()
  {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
    setCurrentIndex(nextIndex)
  }

  function previousUser()
  {
    const newIndex = currentIndex === 0 ? 0 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  function handleUndoPress()
  {
    previousUser()
  }
  
  function handleLikePress()
  {
    swipesRef.current.openLeft()
  }

  function handlePassPress()
  {
    swipesRef.current.openRight()
  }


    return (
        <View style={styles.container}>
          
          <View style={styles.swipes}>
            {users.length > 1 &&
              users.map((u, i) =>
                currentIndex === i && (
                  <Swipes
                    key={i}
                    ref={swipesRef}
                    currentIndex={currentIndex}
                    users={users}
                    handleLike={handleLike}
                    handlePass={handlePass}>
                  </Swipes>))
            }
          </View>
          <BottomBar handleUndoPress={handleUndoPress} handleLikePress={handleLikePress} handlePassPress={handlePassPress} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset:
    {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})
