import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user"

const mapStateToProps = (state, ownProps) => {
     const { user : { notifications } } = state;
     return {
          notifications
     };
}
const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getNotifications : () => {
               dispatch(userActions.getNotifications());
          }
     }
}

                    // 첫번째 인자는 mapStateToProps 이기때문에 null 처리
                    // 두번째 인자로 mapDispatchToProps 를 넣고 컨테이너랑 연결
export default connect(mapStateToProps, mapDispatchToProps)(Container);