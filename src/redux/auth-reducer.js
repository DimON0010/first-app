import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) =>
    ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    });

export const getAuth = () => {
    return async (dispatch) => {
        let responce = await authAPI.getAuth();

        if (responce.data.resultCode === 0) {
            let {id, email, login} = responce.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }
};

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let responce = await authAPI.login(email, password, rememberMe);

        if (responce.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            let message = responce.data.messages.length > 0 ? responce.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        let responce = await authAPI.logout();

        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false
            ))
        }
    }
};

export default authReducer;