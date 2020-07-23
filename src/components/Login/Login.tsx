import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input} from "../common/FormsContols/FormsControls";
import {required} from "../../utils/validftors/validators";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsContols/FormsControls.module.css";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Login'} component={Input} name={"login"} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} component={Input} type={"password"} name={"password"}
                       validate={[required]}/>
            </div>
            <div>
                <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> remember me
            </div>
            <div>
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl &&
                <Field placeholder={'Symbols of captcha'} component={Input} name={"captcha"} validate={[required]}/>}
            </div>
            <div>
                <button>Submit</button>
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
        </form>)
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);
type LoginFormDataType = {
    captcha: string | null
    rememberMe: boolean
    password: string
    login: string
}
type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type DispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
const Login: React.FC<MapStatePropsType & DispatchPropsType> = ({isAuth, captchaUrl, login}) => {

    const onSubmit = (data: LoginFormDataType) => {
        login(data.login, data.password, data.rememberMe, data.captcha)
    };

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
};

const mapStateToProps = (state: AppStateType | any): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {login}),
)(Login);