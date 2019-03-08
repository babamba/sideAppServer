import React from "react";
import App from "./presenter"

// 컨테이너 컴포넌트는 논리 logic을 갖고있다 api 등등
const Container = props => <App {...props}/>

// 컨테이너 컴포넌트는 props 를 받아서 프레젠터 안에 있는 앱 컴포넌트를 준다.
// provider 임
// 컨테이너는 리덕스를 알고 state를 이해하고 api 리덕스를 부를 수 잇다.

export default Container;