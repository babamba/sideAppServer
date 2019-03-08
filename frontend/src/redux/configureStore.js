import { createStore, combineReducers , applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nState } from "redux-i18n";
import user from 'redux/modules/user';
import photos from 'redux/modules/photos';
// import Reactotron from "ReactotronConfig"

// 이렇게 import 해도 작동은 하지만 dev 모드에서만 작동시키고 싶기때문에 
// process 를통해 dev모드 일때 require 시킨다.
// import { logger } from "redux-logger";



// process -> node.js의 전체정보를 가지고있는 variable 
// production 인지 development 인지 구분
const env = process.env.NODE_ENV;

// 히스토리 ( 웹사이트 뒤로 가기등 기록 )
const history = createHistory();

// 미들웨어 알아보기 TODO
// 히스토리 오브젝트를 미들웨어에게 준다
const middlewares = [thunk, routerMiddleware(history)];

if(env === "development"){
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

// 리듀서에도 라우트리듀서 추가 
// state 의 리듀서들 
const reducer = combineReducers({
    user,
    photos,
    routing: routerReducer,
    // 언어 설정을 다른언어로 할수 있게
    i18nState
})
let store;

if(env === "development"){
    //store = initialState => Reactotron.createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
    store = initialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
}else{
                                                // list of function array를 unpack 
                                                // 요로케하면 배열일경우 value값을 보내준다 
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };

export default store();