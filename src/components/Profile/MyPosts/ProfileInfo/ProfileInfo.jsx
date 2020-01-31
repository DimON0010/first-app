import React from 'react';
import cls from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';
import lookingForAJob from '../../../../assets/images/lookingForAJob.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader />
    }
    return <div>
        <div className={cls.content}>
            <img src='https://www.wallpapers.net/web/wallpapers/valley-harley-davidson-hd-wallpaper/5120x2160.jpg'
                 alt='wallpaper'/>
        </div>
        <div className={cls.descriptionBlock}>
            <img src={props.profile.photos.large}/>
            <div>{props.profile.fullName}</div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
        <div>
            <div>{props.profile.aboutMe}</div>
            <div>{ props.profile.lookingForAJob === true && <img className={cls.lookingforAJob} src={lookingForAJob} /> }</div>
            <div>{ props.profile.lookingForAJob === true && props.profile.lookingForAJobDescription}</div>
        </div>
        <div className={cls.socialContact}>
            Social Contacts
            {}
        </div>
    </div>
};

export default ProfileInfo;