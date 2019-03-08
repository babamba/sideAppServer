import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.module.scss";

export const SignupForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <h3 className={formStyles.signupHeader}>
        {context.t("Sign up to see photos and videos from your friends.")}
        </h3>
        <FacebookLogin 
                    appId = "719621631746451"
                    autoLoad = {false}
                    fields = "name,email,picture"
                    callback={props.handleFacebookLogin}
                    cssClass = {formStyles.facebookSingupLogin}
                    icon="fa-facebook-official"
                    textButton={context.t("Log in with Facebook")}
                />
      <span className={formStyles.divider}>{context.t("or")}</span>
        <form className={formStyles.form} onSubmit={props.handelSubmit} >
            <input type="email" 
                    placeholder={context.t("Email")} 
                    className={formStyles.textInput} 
                    onChange={props.handleInputChange}
                        name="email"
                        value={props.emailValue}
            />
            <input type="text" 
                    placeholder={context.t("Full Name")} 
                    className={formStyles.textInput} 
                    onChange={props.handleInputChange}
                        name="name"
                        value={props.nameValue}
            />
            <input type="username" 
                placeholder={context.t("Username")} 
                className={formStyles.textInput} 
                onChange={props.handleInputChange}
                    name="username"
                    value={props.usernameValue}
            />
            <input type="password" 
                placeholder={context.t("Password")} 
                className={formStyles.textInput} 
                onChange={props.handleInputChange}
                    name="password"
                    value={props.passwordValue}
            />
            <input type="submit" 
                value={context.t("Sign up")} 
                className={formStyles.button} 
            />
        </form>
        <p className={formStyles.terms}>
        {context.t("By signing up, you agree to our")}<span>{context.t("Terms & Privacy Policy")}</span>.
        </p>
    </div>
  );

SignupForm.propTypes = {
    usernameValue : PropTypes.string.isRequired,
    passwordValue : PropTypes.string.isRequired,
    emailValue : PropTypes.string.isRequired,
    nameValue : PropTypes.string.isRequired,

    handelSubmit : PropTypes.func.isRequired,
    handleInputChange : PropTypes.func.isRequired
}  

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SignupForm;