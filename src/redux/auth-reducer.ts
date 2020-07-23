import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const GET_CAPTCHA_URL = 'authReducer/GET_CAPTCHA_URL';


type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
    captchaUrl: string | null
}
let initialState = {
    userId: null ,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
};


const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.payload
            }
        }

        default:
            return state;
    }
};
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: {userId: number | null, email: string | null, login: string | null, isAuth: boolean}
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType =>
    ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    });
type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL
    payload: string
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType =>
    ({
        type: GET_CAPTCHA_URL,
        payload: captchaUrl
    });

export const getAuth = () => {
    return async (dispatch: any) => {
        let data = await authAPI.getAuth();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => {
    return async (dispatch: any) => {
        let responce = await authAPI.login(email, password, rememberMe, captcha);

        if (responce.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            if(responce.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = responce.data.messages.length > 0 ? responce.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
};

export const logout = () => {
    return async (dispatch: any) => {
        let responce = await authAPI.logout();

        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false
            ))
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const responce = await securityAPI.getCaptchaUrl();
        const captchaUrl = responce.data.url;

        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
};

export default authReducer;