import React , { Component }from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component{
    state = {
        username : '',
        password : ''
    }

    //index 에 있는 것과 연결되서 쓸 수있게 prop 설정
    static propTypes = {
        facebookLogin : PropTypes.func.isRequired,
        usernameLogin : PropTypes.func.isRequired
    }

    render(){
        const {username , password } = this.state;
        return <LoginForm 
                handleInputChange={this._handleInputChange}
                handelSubmit={this._handelSubmit}
                handleFacebookLogin = {this._handleFacebookLogin}
                usernameValue={username} 
                passwordValue={password} 
                
                />;
    }

    // 처음에 input에 value값만 state에 정의하고 프리젠터에서 props로 정의해놓으면 아무것도 입력이 되지않음
    // 그래서 function도 prop 로 넘겨줘야 함
    // 컨테이너에서 정의하고 props로 넘겨준다 
    // 프리젠터에서 props로 넘어올 func prop의 type을 정의해주고 각 input에 onChange 이벤트를 func로 등록 

    _handleInputChange = event => {
        // input 의 onchange가 발생하는 태그의 value와 각 태그를 구분할 수 있는 input name값을 주고 name 값을 저장
        const { target : { value, name } } = event;

        // 한글자 한글자 칠때마다 계속 onchange가 일어나므로 계속 state를 업데이트한다.
        this.setState({
            [name] : value
        })
        console.log(this.state);
    }

    _handelSubmit = event => {
        const{ usernameLogin } = this.props;
        const{ username, password } = this.state;
        event.preventDefault();
        console.log(this.state);
        // 여기가 받은 token을 가지고 redux / api로 보내야 할  액션이 위치해야 할 곳
        usernameLogin(username, password);
        
    }

    _handleFacebookLogin = response => {
        
        const { facebookLogin } = this.props;
        facebookLogin(response.accessToken);
        console.log(response);

        // 여기가 받은 token을 가지고 redux / api로 보내야 할  액션이 위치해야 할 곳
    }


} 

export default Container;