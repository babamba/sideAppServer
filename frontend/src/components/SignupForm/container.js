import React, {Component} from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends Component {

    state = {
        email : '',
        name : '',
        username : '',
        password: '',
    }

    //index 에 있는 것과 연결되서 쓸 수있게 prop 설정
    static propTypes = {
        facebookLogin : PropTypes.func.isRequired,
        createAccount : PropTypes.func.isRequired
    }

    render(){
        const { email, name , username, password} = this.state;
        return <SignupForm 
                    emailValue = {email}
                    nameValue = {name} 
                    usernameValue = {username}
                    passwordValue = {password}
                    handleInputChange = {this._handleInputChange}
                    handelSubmit = {this._handleSubmit}
                    handleFacebookLogin = {this._handleFacebookLogin}
                />
    }


    _handleInputChange = event =>{
        const { target: { value, name } } = event;

        this.setState({
            [name] : value
        })
        console.log(this.state);
    }

    _handleSubmit = event => {
        const{ email, name, password, username} = this.state;
        const { createAccount } = this.props;
        event.preventDefault();
        console.log(this.state);
        createAccount(username, password, email, name);
        
    }

    _handleFacebookLogin = response => {
        console.log(response);
        const { facebookLogin } = this.props;
        facebookLogin(response.accessToken)

        // 여기가 받은 token을 가지고 redux / api로 보내야 할  액션이 위치해야 할 곳
    }



}

export default Container;