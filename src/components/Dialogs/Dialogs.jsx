import React from 'react';
import cls from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsContols/FormsControls";
import {maxLengthCreator, required} from "../../utils/validftors/validators";

const maxLength50 = maxLengthCreator(50);

let AddMessageForm = (props) => {
  return (<form onSubmit={props.handleSubmit}>
      <div>
          <Field component={Textarea} placeholder='write your message' name={'dialogsMessage'}
          validate={[required, maxLength50]}/>
      </div>
      <div>
          <button>Send</button>
      </div>
  </form>)
};

AddMessageForm = reduxForm({form: 'dialogsPageForm'})(AddMessageForm);


const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem avatar={d.avatar} name={d.name} id={d.id}/>);
    let messagesElements = props.state.messages.map(m => <Message message={m.message}/>);


    let onSendMessageClick = (values) => {
        props.addTextMessageCreator(values.dialogsMessage);
    };

    return (
        <div className={cls.dialogs}>
            <div className={cls.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={cls.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={onSendMessageClick} />
            </div>
        </div>
    )
};

export default Dialogs;