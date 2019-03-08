// auth 관련 기능을 리덕스 스토어에 연결
// 인덱스에서 로그인 회원가입 유저명 확인 이메일 등의 액션을 할거임
import { connect } from "react-redux";

// 따라서 이 컴포넌트에게 리덕스 액션을 줄것임
import Container from "./container";

// index는 redux 작업만 한다.

// Add all the actin fro :
// Log in
// Sigh up
// Receive password
// Check username
// Check password
// Check email

export default connect()(Container);



