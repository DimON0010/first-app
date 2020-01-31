import React from 'react';
import cls from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={cls.header}>
        <img src='http://diariodeiguala.com/wp-content/uploads/2018/02/How-to-add-new-elements-to-the-logo-1.jpg' alt='logo'/>
        <div className={cls.loginBlock}>
            { props.isAuth ?
                <div>{props.login} - <button onClick={props.logout}>log out</button></div> :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
};

export default Header;