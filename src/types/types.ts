export type PhotosObjectType = {
    small: null | string
    large: null | string
}
export type ProfileContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type ProfileType = {
    aboutMe: string | null
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: PhotosObjectType
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: PhotosObjectType
    status: null | string
    followed: boolean
}