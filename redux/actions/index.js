import { USER_STATE_CHANGE, USER_PROFILE_PICTURES_STATE_CHANGE} from '../constants/index'
import firebase from 'firebase'
import { SnapshotViewIOSComponent } from 'react-native'
require('firebase/firestore')


export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log(snapshot.data())
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}


export function fetchUserProfilePictures() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("profilePictures")
            .doc(firebase.auth().currentUser.uid)
            .collection("userProfilePictures")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let profilePictures = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_PROFILE_PICTURES_STATE_CHANGE, profilePictures })
            })
    })
}