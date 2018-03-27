import { userLogin,userReg,getCode,userLogout } from '../services/User';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'user',
    
        state: {
            userInfo:'',
            collapsed: false,
            loading: true,
            authLoading: false,
            profile: null,
            isLogin:false,
            r_errors:''
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
                    payload: {authLoading: false},
                });
                Toast.loading('',0)
                const response = yield call(userReg, payload);
                let nPayload = {authLoading: false};
                if (response.code == 'SUCCESS') {
                    Toast.hide();
                    nPayload.userInfo = response.data;
                    nPayload.authLoading=true;
                }
                yield put({
                    type: 'save',
                    payload: nPayload
                });
            },
            *login({ payload }, { call, put }) {
                
                Toast.loading('',0);
                const response = yield call(userLogin,payload);
                let nPayload = {};
                if(response.code === 'SUCCESS'){
                    
                    Toast.hide();
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
                    //返回错误信息  r_errors
                    nPayload.r_errors = response.errors;
                    nPayload.r_IS;
                    yield put({
                        type:'save',
                        payload:nPayload
                    })
                }
                
                
            },
            *code({ payload },{ call,put }){
                console.log(payload)
                const response = yield call(getCode, payload);
                if(response.code=='SUCCESS'){
                    Toast.info('短信已发送成功 !!!', 2);
                }else{
                    Toast.info('短信发送失败 !!!', 2);
                }
            },
            *logout({ payload }, { call, put }) {
                Toast.loading('',0)
                const isLogin = {isLogin:false};
                yield put({
                    type:'save',
                    payload:isLogin
                })
                const response = yield call(userLogout,payload);
                console.dir(response);
                let nPayload = {isLogin: false};
                if(response.code == 'SUCCESS'){
                    
                    Toast.hide();
                    localStorage.setItem('UTRAFF', '');
                    localStorage.setItem('UT', '');
                    nPayload.res = response;
                    nPayload.userInfo = ''
                }else{
                    nPayload.res = response;
                    nPayload.isLogin=false
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
                yield put(routerRedux.push('login'));
                //return <Switch><Redirect to="/login"/></Switch>
               
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    