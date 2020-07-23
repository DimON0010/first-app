import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosObjectType, PostType, ProfileType} from "../types/types";

const ADD_POST: string = 'profileReducer/ADD_POST';
const UPDATE_TEXT_MESSAGE: string = 'profileReducer/UPDATE_TEXT_MESSAGE';
const SET_USER_PROFILE: string = 'profileReducer/SET_USER_PROFILE';
const SET_STATUS: string = 'profileReducer/SET_STATUS';
const DELETE_POST: string = 'profileReducer/DELETE_POST';
const SAVE_PHOTO_SUCCESS: string = 'profileReducer/SAVE_PHOTO_SUCCESS';
const CHANGE_UPDATE_STATUS: string = 'profileReducer/CHANGE_UPDATE_STATUS';

// type InitialStateType = {
//     posts: Array<PostType>
//     profile: ProfileType | null
//     profileUpdateStatus: string
//     status: string
//     newPostMessage: null | string
// }
let initialState = {
    posts: [{id: 1, message: 'Hello, how are you?', likesCount: 15},
        {id: 2, message: 'I am the dangerous, Skyler.', likesCount: 20},
        {id: 3, message: 'And if you save yourself...', likesCount: 11}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    profileUpdateStatus: 'none',
    status: "",
    newPostMessage: null as string | null
};

type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any): InitialStateType => {

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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case CHANGE_UPDATE_STATUS: {
            return {
                ...state,
                profileUpdateStatus: action.status
            };
        }
        default:
            return state;
    }
};

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType =>
    ({
        type: ADD_POST,
        newPostText
    });
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType =>
    ({
        type: DELETE_POST,
        postId
    });
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType =>
    ({
        type: SET_USER_PROFILE,
        profile
    });
type setUserStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setUserStatus = (status: string): setUserStatusType =>
    ({
        type: SET_STATUS,
        status
    });
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosObjectType
}
export const savePhotoSuccess = (photos: PhotosObjectType): SavePhotoSuccessType =>
    ({
        type: SAVE_PHOTO_SUCCESS,
        photos
    });
type ChangeUpdateStatusType = {
    type: typeof CHANGE_UPDATE_STATUS
    status: string
}
export const changeUpdateStatus = (status: string): ChangeUpdateStatusType =>
    ({
        type: CHANGE_UPDATE_STATUS,
        status
    });

export const getUser = (userId: number) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.getUser(userId);
        dispatch(setUserProfile(responce.data));
    }
};
export const getUserStatus = (userId: number) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.getUserStatus(userId);
        dispatch(setUserStatus(responce.data));

    }
};
export const updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.updateUserStatus(status);
        if (responce.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
};
export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.savePhoto(file);

        if (responce.data.resultCode === 0) {
            dispatch(savePhotoSuccess(responce.data.data.photos));
        }
    }
};
export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId =getState().auth.userId;
        const responce = await profileAPI.saveProfile(profile);

        if (responce.data.resultCode === 0) {
           dispatch(getUser(userId));
           dispatch(changeUpdateStatus('success'));
        } else {
            let message = responce.data.messages.length > 0 ? responce.data.messages[0] : "Some error";
            dispatch(stopSubmit("edit-profile", {_error: message}));
            dispatch(changeUpdateStatus('error'));
        }
    }
};

export default profileReducer;