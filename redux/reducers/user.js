import { USER_STATE_CHANGE, USER_PROFILE_PICTURES_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser: null,
    profilePictures: []
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_PROFILE_PICTURES_STATE_CHANGE:
            return {
                ...state,
                profilePictures: action.profilePictures
            }
        default:
            return state;
    }
}
