import {profileAPI} from "../api/api";

const ADD_POST = 'profileReducer/ADD_POST';
const UPDATE_TEXT_MESSAGE = 'profileReducer/UPDATE_TEXT_MESSAGE';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_STATUS = 'profileReducer/SET_STATUS';
const DELETE_POST = 'profileReducer/DELETE_POST';

let initialState = {
    posts: [{id: 1, message: 'Hello, how are you?', likesCount: 15},
        {id: 2, message: 'I am the dangerous, Skyler.', likesCount: 20},
        {id: 3, message: 'And if you save yourself...', likesCount: 11}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newMessage = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };

            return {
                ...state,
                posts: [...state.posts, newMessage],
            };
        }
        case UPDATE_TEXT_MESSAGE: {
            return {
                ...state,
                newPostMessage: action.text
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) =>
    ({
        type: ADD_POST,
        newPostText
    });

export const deletePost = (postId) =>
    ({
        type: DELETE_POST,
        postId
    });

export const setUserProfile = (profile) =>
    ({
        type: SET_USER_PROFILE,
        profile
    });
export const setUserStatus = (status) =>
    ({
        type: SET_STATUS,
        status
    });

export const getUser = (userId) => {
    return async (dispatch) => {
        let responce = await profileAPI.getUser(userId);
        dispatch(setUserProfile(responce.data));
    }
};
export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let responce = await profileAPI.getUserStatus(userId);
        dispatch(setUserStatus(responce.data));

    }
};
export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let responce = await profileAPI.updateUserStatus(status);
        if (responce.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
};

export default profileReducer;