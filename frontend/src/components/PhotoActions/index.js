import { connect } from "react-redux";
import Container from "./container"
import { actionCreators as photoActions } from "redux/modules/photos";

//own props는 컴포넌트에 들어가있는 props를 땡겨올 수 있음
// 땡겨온 props의 true false값을 비교하여 리듀서를 구분해서 부를 수 있음
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps)
    return {
        handleHeartClick : () => {
            if(ownProps.isLiked){
                dispatch(photoActions.unlikePhoto(ownProps.photoId));
            }else{
                dispatch(photoActions.likePhoto(ownProps.photoId));
            }
        }    
    }
}

export default connect(null, mapDispatchToProps)(Container);