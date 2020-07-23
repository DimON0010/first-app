import React, {ChangeEvent, useState} from 'react';
import cls from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userImage from '../../../../assets/images/userImage.png';
import ProfileDataForm from "./ProfileDataForm";
import {ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType
    updateStatus: string
    savePhoto: (photo: any) => void
    saveProfile: (ProfileType: ProfileType) => void
    isOwner: boolean
    status: string
    updateUserStatus: (newStatus: string) => void
}
const ProfileInfo = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData);
        if(props.updateStatus === 'success') {
            setEditMode(false);
        };
    };

    if (!props.profile) {
        return <Preloader/>
    }
    return <div>
        <div className={cls.content}>
            <img src='https://www.wallpapers.net/web/wallpapers/valley-harley-davidson-hd-wallpaper/5120x2160.jpg'
                 alt='wallpaper'/>
        </div>
        <div className={cls.descriptionBlock}>
            <img src={props.profile.photos.large || userImage} className={cls.mainPhoto}/>
            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
        {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} updateStatus={props.updateStatus}/>
                  : <ProfileData goToEditMode={() => setEditMode(true)} isOwner={props.isOwner} profile={props.profile}/>}
    </div>
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div> }
      <div>
          <b>Full Name</b>: {profile.fullName}
      </div>
      <div>
          <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob &&
      <div>
          <b>My profesional skills</b>: {profile.lookingForAJobDescription}
      </div>
      }
      <div>
          <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
          <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}
      </div>
  </div>
};
type ContactPropsType = {
    key: string
    contactTitle: string
    contactValue: any
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return <div className={cls.contact}>
        <b>{contactTitle}</b>: {contactValue}
  </div>
};


export default ProfileInfo;