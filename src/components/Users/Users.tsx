import React, {Props} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
    followingInProgress: Array<number>
    follow: (iserId: number) => void
    unfollow: (iserId: number) => void
    users: Array<UserType>
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
return(
    <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        {
            props.users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                                       unfollow={props.unfollow} follow={props.follow} />)
        }
    </div>)

};

export default Users;