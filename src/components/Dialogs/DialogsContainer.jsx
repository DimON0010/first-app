import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {addTextMessageCreator, updateTextMessageBodyCreator} from "../../redux/dialogs-reducer";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addTextMessageCreator, updateTextMessageBodyCreator}))(Dialogs);