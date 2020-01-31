import React from 'react';
import DialogItem from "../../Dialogs/DialogItem/DialogItem";

const NavbarFriends = (props) => {
    let friendsOnline = props.state.map( f => <DialogItem id={f.id} name={f.name} avatar={f.avatar}/>);
    return (
        <div>
            <h2>Online friends</h2>
            {friendsOnline}
        </div>)
};

export default NavbarFriends;