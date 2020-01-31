import React from 'react';
import cls from './Users.module.css';
import userImage from '../../assets/images/userImage.png';
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img className={cls.avatar} src={user.photo && user.photos.small != null ? user.photo.small : userImage}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id == user.id)} onClick={() => {
                                unfollow(user.id)
                            }
                            }>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id == user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }
                                      }>Follow</button>
                        }
                    </div>
                </span>
            <span>
                    <div>{user.name} </div>
                    <div>{user.status}</div>
                </span>
            <span>
                    <span>{"user.location.country"}, </span>
                    <span>{"user.location.city"}</span>
                </span>
        </div>)
};

export default User;