import {followAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS';
const SET_CURRENT_PAGE = 'SET-PAGES-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    currentPage: 1,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: []

};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case SET_USERS: {
            return {
                ...state, users: [...action.users]
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.totalUsers
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.pageNumber
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            };
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : [...state.followingInProgress.filter(id => id !== action.userId)]
            };
        }
        default: {
            return state;
        }
    }
};

export const followSuccess = (userId) =>
    ({
        type: FOLLOW,
        userId
    });

export const unfollowSuccess = (userId) =>
    ({
        type: UNFOLLOW,
        userId
    });

export const setUsers = (users) =>
    ({
        type: SET_USERS,
        users
    });
export const setTotalUsersCount = (totalUsers) =>
    ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsers
    });
export const setCurrentPage = (pageNumber) =>
    ({
        type: SET_CURRENT_PAGE,
        pageNumber
    });
export const toggleIsFetching = (isFetching) =>
    ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    });
export const toggleFollowingProgress = (isFetching, userId) =>
    ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    });

export const requestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

    };
};

const followUnfollowFlow = async (dispatch, userId, actionCreator, apiMethod) => {
    dispatch(toggleFollowingProgress(true, userId));
    let responce = await apiMethod(userId);
    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
};

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followSuccess, followAPI.follow.bind(followAPI))
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, unfollowSuccess, followAPI.unfollow.bind(followAPI))
    }
};

export default usersReducer;