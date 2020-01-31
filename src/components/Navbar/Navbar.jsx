import React from 'react';
import cls from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import NavbarFriends from "./NavbarFriends/NavbarFriends";

const Navbar = (props) => {
    return (<div>
        <nav className={cls.nav}>
            <div className={cls.item}>
                <NavLink to='/profile' activeClassName={cls.active}>Profile</NavLink>
            </div>
            <div className={cls.item}>
                <NavLink to='/dialogs' activeClassName={cls.active}>Messages</NavLink>
            </div>
            <div className={cls.item}>
                <NavLink to='/users' activeClassName={cls.active}>Users</NavLink>
            </div>
            <div className={cls.item}>
                <NavLink to='/news' activeClassName={cls.active}>News</NavLink>
            </div>
            <div className={cls.item}>
                <NavLink to='/music' activeClassName={cls.active}>Music</NavLink>
            </div>
            <div className={cls.item}>
                <NavLink to='/settings' activeClassName={cls.active}>Settings</NavLink>
            </div>
        </nav>
        <NavbarFriends state={props.state.onlineFriends} />
</div>)
};

export default Navbar;