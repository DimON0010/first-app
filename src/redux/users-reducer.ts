import {followAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {PhotosObjectType, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    currentPage: 1,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id

};

type ActionsTypes = InferActionsType<typeof actions>
type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case 'SET_USERS': {
            return {
                ...state, users: [...action.users]
            };
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state, totalUsersCount: action.totalUsers
            };
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state, currentPage: action.pageNumber
            };
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state, isFetching: action.isFetching
            };
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : [...state.followingInProgress.filter((id: number) => id !== action.userId)]
            };
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    followSuccess: (userId: number) => ({
        type: 'FOLLOW',
        userId
    } as const),
    unfollowSuccess: (userId: number) => ({
        type: 'UNFOLLOW',
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
            type: 'SET_USERS',
            users
        } as const),
    setTotalUsersCount: (totalUsers: number) => ({
            type: 'SET_TOTAL_USERS_COUNT',
            totalUsers
        } as const),
    setCurrentPage: (pageNumber: number) => ({
            type: 'SET_CURRENT_PAGE',
            pageNumber
        } as const),
    toggleIsFetching: (isFetching: boolean) => ({
            type: 'TOGGLE_IS_FETCHING',
            isFetching
        } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const)

};

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));

    };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, actionCreator: (userId: number) => ActionsTypes, apiMethod: any) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let responce = await apiMethod(userId);
    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, actions.followSuccess, followAPI.follow.bind(followAPI))
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, actions.unfollowSuccess, followAPI.unfollow.bind(followAPI))
    }
};

export default usersReducer;