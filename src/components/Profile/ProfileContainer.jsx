import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUser,
    getUserStatus,
    savePhoto,
    saveProfile,
    setUserProfile,
    updateUserStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId;
        };
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (<Profile {...this.props}
                         profile={this.props.profile}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         updateStatus={this.props.updateStatus}
        />)
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    updateStatus: state.profilePage.profileUpdateStatus
});

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {setUserProfile, getUser, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter)(ProfileContainer);
