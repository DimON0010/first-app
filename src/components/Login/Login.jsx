import React from "react";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input} from "../common/FormsContols/FormsControls";
import {required} from "../../utils/validftors/validators";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsContols/FormsControls.module.css";

const LoginForm = ({handleSubmit, error}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field placeholder={'Login'} component={Input} name={"login"} validate={[required]}/>
        </div>
        <div>
          <Field placeholder={'Password'} component={Input} type={"password"} name={"password"} validate={[required]}/>
        </div>
        <div>
          <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> remember me
        </div>
        <div>
            <button>Submit</button>
        </div>
          {error && <div className={styles.formSummaryError}>{error}</div>}
      </form>)
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({login, isAuth}) => {

    const onSubmit = (data) => {
      login(data.login, data.password, data.rememberMe)
    };

    if(isAuth) {
        return <Redirect to={"/profile"}/>
    }

  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {login}),
    )(Login);