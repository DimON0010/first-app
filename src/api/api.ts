import axios from "axios";
import {PhotosObjectType, ProfileType, UserType} from "../types/types";

let instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '5d92bbae-a212-40c2-9538-d06f41a91d06'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});
enum ResultCodes {
    Success = 0,
    Error = 1
}
enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}
type getUsersRespType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}
type SimpleServerResponceType = {data: any, messages: Array<string | null>, resultCode: ResultCodes}
export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<getUsersRespType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => responce.data)
    }

};

type GetAuthRespType = {
    data: {id: number, login: string, email: string}
    messages: Array<string>
    resultCode: ResultCodes
}
type LoginRespType = {
    resultCode: ResultCodes | ResultCodesForCaptcha
    messages: Array<string | null>
    data: {
        userId: number
    }
}
export const authAPI = {

    getAuth() {
       return instance.get<GetAuthRespType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
        return instance.post<LoginRespType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.post<{ resultCode: ResultCodes}>('auth/logout')
    }
};
type SavePhotoRespType = {
    data: { data: { photos: PhotosObjectType } }
    messages: Array<string | null>
    resultCode: ResultCodes
}

export const profileAPI = {

    getUser(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateUserStatus(status: string) {
        return instance.put<SimpleServerResponceType>(`profile/status/`, {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<SavePhotoRespType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
};

export const followAPI = {

    follow(userId: number) {
       return instance.post<SimpleServerResponceType>('follow/' + userId)
    },
    unfollow(userId: number) {
       return instance.delete<SimpleServerResponceType>(`follow/` + userId)
    }

};
export const securityAPI = {

    getCaptchaUrl() {
       return instance.get<{url: string}>('security/get-captcha-url')
    }

};