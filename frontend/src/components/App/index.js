import { connect } from "react-redux" // 리덕스 스토어에 연결 하는 것
import Container from "./container"

// index는 redux 작업만 한다.
const mapStateProps = (state, ownProps) => {
    const{ user, routing: {location} } = state;
    return {
        // 새로운 props 생성 / user는 리듀서 임
        // 스토어 안에 있는 variable을 얻으려고 하는 행위 
        // 스토어는 isLoggedIn

        // 스토어 안에 내용은 로컬스토리지 안에 'jwt' 라는게 있으면 true 없으면 false
        // 토큰을 얻었냐 없냐 차이
        isLoggedIn : user.isLoggedIn,
        
        // location reducer 
        // blocked update 버그 해결방법
        // 앱컴포넌트가 new props의 존재를 알게됨
        // 해당 prop가 변경되면 앱 컴포넌트가 렌더를 다시 하게됨
        pathname : location.pathname
    };
}

// 이 컴포넌트를 state에 연결하고 있다.
// 컨테이너에 연결
// state 를 통해서 logged in props 를 컨테이너 컴포넌트로 보냄.

// 컴포넌트는 프레젠터에게 map state에서 받았던 props를 줌
export default connect(mapStateProps)(Container);