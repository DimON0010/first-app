import * as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '5d92bbae-a212-40c2-9538-d06f41a91d06'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => responce.data)
    }

};

export const authAPI = {

    getAuth() {
       return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.post('auth/logout')
    }
};

export const profileAPI = {

    getUser(userId) {
        return instance.get(`profile/` + userId)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateUserStatus(status) {
        return instance.put(`profile/status/`, {status})
    }
};

export const followAPI = {

    follow(userId) {
       return instance.post('follow/' + userId)
    },
    unfollow(userId) {
       return instance.delete(`follow/` + userId)
    }

};