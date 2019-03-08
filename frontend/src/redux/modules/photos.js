//imports
import { actionCreators as userActions} from "redux/modules/user";
// actions

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";

// action creators 리덕스 state 바꿀때 사용

function setFeed(feed){
    return {
        type: SET_FEED,
        feed
    }
}

function dolikePhoto(photoId){
    return {
        type: LIKE_PHOTO,
        photoId
    }
}

function doUnlikePhoto(photoId){
    return {
        type: UNLIKE_PHOTO,
        photoId
    }
}

function addComment(photoId, comment){
    return {
        type:ADD_COMMENT,
        photoId,
        comment
    }
}

//토큰을 받을때마다 받은 토큰과 함께 saveToken이라는 액션을 디스패치함. -> 해당 액션을 리듀서에 실행 
// -> 리듀서가  applySetToken() 을 실행하고 isLoggedIn은 참으로 하고 이를 state에 저장


// API actions API부를 떄 사용

function getFeed(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/images/", {
            headers:{
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setFeed(json))
        })
    }
}

function likePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(dolikePhoto(photoId));
        const { user: {token} } = getState();
        fetch(`/images/${photoId}/likes/`, {
            method : "POST",
            headers:{
                "Authorization" : `JWT ${token}`
            }
                
        })
        .then(response => {
            // 토큰장난질해놓으면 로그아웃 처리
            if(response.status === 401){
                dispatch(userActions.logout());
            // optimist update 서버에서 에러가났을때 다시 전 상태로 처리
            } else if(!response.ok){
                dispatch(doUnlikePhoto(photoId));
            }
        })
    }
}

function unlikePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(doUnlikePhoto(photoId));
        const { user: {token} } = getState();
        fetch(`/images/${photoId}/unlikes/`, {
            method : "DELETE",
            headers:{
                "Authorization" : `JWT ${token}`
            }
                
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            } else if(!response.ok){
                dispatch(dolikePhoto(photoId));
            }
        })
    }
}

function commentPhoto(photoId, message){
    return (dispatch, getState) => {
        const { user: {token} } = getState();

        fetch(`/images/${photoId}/comments/`, {
            method : "POST",
            headers:{
                "Authorization" : `JWT ${token}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                message : message
            })  
        })

        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })

        .then(json => {
            if(json.message){
                dispatch(addComment(photoId, json));
            }
        })
    }
}


// initial state

const initialState = {};

// reducer

function reducer(state = initialState , action){
    switch(action.type){
        case SET_FEED:
            return applySetFeed(state, action)
        case LIKE_PHOTO:
            return applyLikePhoto(state, action)
        case UNLIKE_PHOTO:
            return applyUnlikePhoto(state, action)
        case ADD_COMMENT:
            return applyAddComment(state, action)
        default:
            return state;
    }
}


// reducer functions

function applySetFeed(state, action){
    const { feed } = action;
    return {
        ...state,
        feed
    }
}

function applyLikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    // 모든사진을 돌려서 갖고온 사진과 비교 
    const updateFeed = feed.map(photo => {
        if(photo.id === photoId){
            return { ...photo, is_liked : true, like_count: photo.like_count + 1}
        }
        return photo;
    });
    return {state , feed:updateFeed };
}


function applyUnlikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    // 모든사진을 돌려서 갖고온 사진과 비교 
    const updateFeed = feed.map(photo => {
        if(photo.id === photoId){
            return { ...photo, 
                        is_liked : false, 
                        like_count:photo.like_count - 1}
        }
        return photo;
    });
    return {state , feed:updateFeed };
}


function applyAddComment(state, action){
    const { photoId, comment } = action;
    const { feed } = state;

    const updateFeed = feed.map(photo => {
        if(photo.id === photoId){
            return { ...photo, 
                    comments : [...photo.comments, comment]
            }
        }
        return photo;
    });
    return {state , feed:updateFeed };
}
// exports

const actionCreators = {
    getFeed,
    unlikePhoto,
    likePhoto,
    commentPhoto
}


export { actionCreators };

// reducer export

export default reducer;