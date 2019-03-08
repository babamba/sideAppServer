import { connect } from "react-redux";
import Container from "./container";
import { push } from "react-router-redux"
import { actionCreators as userActions } from "redux/modules/user"

const mapStateToProps = (state, ownProps) => {
     const { user: { username } } = state;
     return {
       username
     };
   };

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          goToSearch : searchTerm => {
               dispatch(push(`/search/${searchTerm}`));
          },
          getNotifications : notifications => {
               dispatch(userActions.getNotifications(ownProps.notifications))
          }
     };
};

                    // 첫번째 인자는 mapStateToProps 이기때문에 null 처리
                    // 두번째 인자로 mapDispatchToProps 를 넣고 컨테이너랑 연결
export default connect(mapStateToProps, mapDispatchToProps)(Container);