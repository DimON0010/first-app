import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUser, getUserStatus, setUserProfile, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId;
        };
        this.props.getUser(userId);
        this.props.getUserStatus(userId);

    }

    render() {
        return (<Profile {...this.props} profile={this.props.profile} />)
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {setUserProfile, getUser, getUserStatus, updateUserStatus}),
    withRouter)(ProfileContainer);
