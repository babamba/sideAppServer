import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import store, { history } from 'redux/configureStore';
import App from 'components/App';
import I18n from 'redux-i18n';
import { translations } from 'translations'
// import "ReactotronConfig"

// 라우터에게 히스토리 오브젝트를 전달
// 그래서 router , middleware 둘다 같은 동일한 히스토리 오브젝트를 갖게됨
ReactDOM.render(
    <Provider store = { store }>
        
            {/*  컴포넌트는 이제 현재 언어(영어)를 체크하는 function이 생긴거임 
                                              default 언어    없을 시 기본 언어  */}
            <I18n translations={translations} initialLang="en" fallbackLang="en">
                {/* 컴포넌트가 location을 인지하게 해야함 */}
                <ConnectedRouter history= { history } >
                    <App />
                </ConnectedRouter>
            </I18n>
    </Provider>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


