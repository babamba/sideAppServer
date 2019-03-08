//imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_IMAGE_LIST= "SET_IMAGE_LIST";
const SET_NOTIFICATION_LIST = "SET_NOTIFICATION_LIST";

// action creators 리덕스 state 바꿀때 사용

//토큰을 받을때마다 받은 토큰과 함께 saveToken이라는 액션을 디스패치함. -> 해당 액션을 리듀서에 실행 
// -> 리듀서가  applySetToken() 을 실행하고 isLoggedIn은 참으로 하고 이를 state에 저장
function saveToken(token){
    return {
        type:SAVE_TOKEN,
        token
    }
}

function logout(){
    return {
        type: LOGOUT
    }
}

function setUserList(userList){
    return {
        type: SET_USER_LIST,
        userList
    }
}

function setFollowUser(userId){
    return {
        type:FOLLOW_USER,
        userId
    }
}

function setUnfollowUser(userId){
    return {
        type:UNFOLLOW_USER,
        userId
    }
}

function setImageList(imageList){
    return {
        type:SET_IMAGE_LIST,
        imageList
    }
}

function setNotifications(notifications){
    return {
        type:SET_NOTIFICATION_LIST,
        notifications
    }
}

// API actions API부를 떄 사용

function facebookLogin(access_token) {
    return dispatch => {
      fetch("/users/login/facebook/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        //access_token: access_token
          access_token
        })
      })
        .then(response => response.json())
        .then(json => {
        // request가 정상적으로 실행됬고 response json 안에 token이 있다
        // json을 인수로 받아 saveToken에 함께 보내준다 (보내주면 알아서 숙숙숙)
          if (json.token) {
            dispatch(saveToken(json.token));
          }
        })
        .catch(err => console.log(err));
    };
  }




function usernameLogin(username, password){
    return function(dispatch){
        fetch("/rest-auth/login/", {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                //access_token: access_token
                username,
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json.token))
            }
        })
        .catch(err => console.log(err))
    }
}

function createAccount(username, password, email, name){
    return function(dispatch){
        fetch("/rest-auth/registration/", {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                //access_token: access_token
                username,
                password1 : password,
                password2 : password,
                email,
                name
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json.token))
            }
        })
    }
}

function getPhotoLikes(photoId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json));
      });
  };
}

function followUser(userId){
    return (dispatch, getState) => {
        dispatch(setFollowUser(userId));
        const { user: { token } } = getState();

        fetch(`/users/${userId}/follow/`, {
            method : "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            } else if(!response.ok){
                dispatch(setUnfollowUser(userId));
            }
        })
    }
}


function unfollowUser(userId){
    return (dispatch, getState) => {
        dispatch(setUnfollowUser(userId));
        const { user: { token } } = getState();

        fetch(`/users/${userId}/unfollow/`, {
            method : "DELETE",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            } else if(!response.ok){
                dispatch(setFollowUser(userId));
            }
        })
    }
}

function getExplore(){
    return (dispatch, getState) => {
        const { user: { token } } = getState();

        fetch(`/users/explore`, {
            method : "GET",
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            } 
            return response.json();
        })
        .then(json => dispatch(setUserList(json)));
    }
}

function searchByTerm(searchTerm){
    return async(dispatch, getState) => {
        const { user : {token } } = getState();
        const userList = await searchUsers(token, searchTerm);
        const imageList = await searchImages(token, searchTerm);

        if(userList === 401 || imageList === 401){
            dispatch(logout());
        }

        dispatch(setUserList(userList));
        dispatch(setImageList(imageList));
    }
}

function searchUsers(token, searchTerm){
    return fetch(`/users/search/?username=${searchTerm}`, {
        headers : {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.status === 401) {
            return 401;
        } 
        return response.json()
    })
    .then(json => json);
}

function searchImages(token, searchTerm){
    return fetch(`/images/search/?hashtags=${searchTerm}`, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 401) {
            return 401;
          }
          return response.json();
        })
        .then(json => json);
}

function getNotifications() {
    return (dispatch, getState) => {
      const { user: { token } } = getState();
      fetch(`/notifications/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
      .then(response => {
          if (response.status === 401) {
              dispatch(logout());
          }
          return response.json();
      })
      .then(json => dispatch(setNotifications(json)));
    };
  }

// initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token : localStorage.getItem("jwt")
};

// reducer
function reducer(state = initialState, action ){
    switch(action.type){
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOGOUT :
            return applyLogout(state, action);
        case SET_USER_LIST :
            return applySetUserList(state, action);
        case FOLLOW_USER :
            return applyFollowUser(state, action);
        case UNFOLLOW_USER :
            return applyUnfollowUser(state, action);
        case SET_IMAGE_LIST :
            return applySetImageList(state, action);
        case SET_NOTIFICATION_LIST :
            return applySetNotificationList(state, action);
        default:
        return state;
    }
}

// reducer functions

function applySetToken(state, action){
    const { token } = action;
    localStorage.setItem("jwt",token)
    return {
        ...state,
        isLoggedIn:true,
        token : token
    }
}

function applyLogout(state, action){
    localStorage.removeItem("jwt");
    return {
        isLoggedIn : false
    }
}

function applySetUserList(state, action){
    const { userList } = action;
    return{
        ...state,
        userList
    }
}

function applyFollowUser(state, action){
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.id === userId){
            return {...user, following:true };
        }
        return user;
    });
    return {...state, userList: updatedUserList}
}

function applyUnfollowUser(state, action){
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.id === userId){
            return {...user, following:false };
        }
        return user;
    });
    return {...state, userList: updatedUserList}
}

function applySetImageList(state, action){
    const { imageList } = action;
    return {
        ...state,
        imageList
    }
}

function applySetNotificationList(state, action){
    const { notifications } = action;
    return {
        ...state,
        notifications
    }
}

// exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getPhotoLikes,
    followUser,
    unfollowUser,
    getExplore,
    searchByTerm,
    getNotifications
}

export { actionCreators };

// reducer export

export default reducer;