import { userLogin,userReg,getCode,userLogout } from '../services/api';
import { routerRedux,Redirect,Switch } from 'dva/router';

export default {
    
        namespace: 'app',
    
        state: {
            userInfo:'',
            collapsed: false,
            loading: true,
            authLoading: false,
            profile: null,
            isLogin:false
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type: 'fetchConfig'
                });
            },
        },
    
        effects: {
            *user({ payload }, { call, put }){
                yield put(routerRedux.push('/login'))
            },
            *fetch({ payload }, { call, put }) {  // eslint-disable-line
                yield put({ type: 'save' });
            },
            *fetchConfig({ payload }, { call, put }) {
                const userInfo = localStorage.getItem("UTRAFF");
                let nPayload={};
                if(userInfo != ""){
                    nPayload.isLogin=true;
                    nPayload.userInfo=JSON.parse(userInfo);
                    yield put({
                        type: 'save',
                        payload: nPayload
                    });
                }
                
            },
            *reg({ payload },{ call, put }){
                yield put({
                    type: 'save',
                    payload: {authLoading: true},
                });
                const response = yield call(userReg, payload);
                let nPayload = {authLoading: false};
                if (response.code == 'SUCCESS') {
                    nPayload.userInfo = response.data;
                    nPayload.authLoading=true;
                    //localStorage.setItem('UTRAFF', response.data);
                }
                yield put({
                    type: 'save',
                    payload: nPayload
                });
            },
            *login({ payload }, { call, put }) {
                const response = yield call(userLogin,payload);
                
                let nPayload = {};
                if(response.code === 'SUCCESS'){
                    nPayload.isLogin = true;
                    nPayload.userInfo = response.data.profile;
                    localStorage.setItem('UTRAFF', JSON.stringify(response.data.profile));
                    localStorage.setItem('UT', JSON.stringify(response.data.token));
                    yield put({
                        type:'save',
                        payload:nPayload
                    })
                    yield put(routerRedux.push('/'));
                }else{
                    yield put({
                        type:'save',
                        payload:nPayload
                    })
                }
                
                
            },
            *code({ payload },{ call,put }){
                console.log(payload);
                const response = yield call(getCode, payload);
            },
            *logout({ payload }, { call, put }) {
                const isLogin = {isLogin:false};
                yield put({
                    type:'save',
                    payload:isLogin
                })
                const response = yield call(userLogout,payload);
                let nPayload = {isLogin: false};
                if(response.code == 'SUCCESS'){
                    localStorage.setItem('UTRAFF', '');
                    localStorage.setItem('UT', '');
                    nPayload.res = response;
                }else{
                    nPayload.res = response;
                    nPayload.isLogin=false
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
                yield put(routerRedux.push('/login'))
                //return <Switch><Redirect to="/login"/></Switch>
               
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    