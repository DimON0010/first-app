import React from "react";
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import {Input, Textarea} from "../../../common/FormsContols/FormsControls";
import cls from './ProfileInfo.module.css';
import styles from "../../../common/FormsContols/FormsControls.module.css";
import {ProfileType} from "../../../../types/types";

type ProfileDataFormOwnPropsType = {
    profile: ProfileType
}
type ProfileFormDataType = {
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType>
    = ({handleSubmit, error, profile}) => {
    return <form onSubmit={handleSubmit}>
        <button>edit</button>
        {error && <div className={styles.formSummaryError}>{error}</div>}
        <div>
            <b>Full Name</b>: <Field placeholder='Full name' component={Input} name={"fullName"}/>
        </div>
        <div>
            <b>Looking for a job</b>: <Field component={Input} name={"lookingForAJob"} type="checkbox"/>
        </div>
        <div>
            <b>My profesional skills</b>: <Field placeholder="My profesional skills" component={Textarea}
                                                 name={"lookingForAJobDescription"}/>
        </div>
        <div>
            <b>About me</b>: <Field placeholder='About me' component={Textarea} name={"aboutMe"}/>
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={cls.contact}>
                <b>{key}</b> : <Field placeholder={key} component={Input} name={'contacts.' + key}/>
            </div>
        })}
        </div>
    </form>
};

export default reduxForm<ProfileFormDataType, ProfileDataFormOwnPropsType>({form: 'edit-profile'})(ProfileDataForm);