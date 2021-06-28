import React from 'react'
import { View, Text } from 'react-native'

export default function Feed() {
    return (
        <View style={styles.container}>
          <TopBar />
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
