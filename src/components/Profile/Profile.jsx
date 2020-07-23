import React from 'react';
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         saveProfile={props.saveProfile}
                         savePhoto={props.savePhoto}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer store={props.store} />
        </div>
    )
};

export default Profile;