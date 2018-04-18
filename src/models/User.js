import { userLogin,userReg,getCode,userLogout,userLoginCode,reSetPassword ,updateUser,alreadyUser} from '../services/User';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'user',
    
        state: {
            userInfo:null,
            collapsed: false,
            loading: true,
            authLoading: false,
            profile: null,
            isLogin:false,
            r_errors:'',
            authentication:false,
            authlayout:false,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                const { location } = history;
                if(location.pathname != '/' || location != '/user'){
                    dispatch({
                        type:'fetchUser'
                    })
                }
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
            *fetchUser({ payload },{ call, put }){
                yield call(alreadyUser,payload);
            },
            *fetchConfig({ payload }, { call, put }) {
                const UT = localStorage.getItem("UT");
                const userInfo = localStorage.getItem('UTRAFF')
                let nPayload={};
                if(UT){
                    nPayload.isLogin=true;
                    nPayload.authlayout = true;
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
                if (response.code == 0) {
                    Toast.hide();
                    nPayload.userInfo = response.data;
                    nPayload.authLoading=true;
                }else if(response.code === 400){
                    Toast.info(response.errors.phone)
                }
                yield put({
                    type: 'save',
                    payload: nPayload
                });
                yield put(routerRedux.push('/login'));
            },
            *login({ payload }, { call, put }) {
                
                Toast.loading('',0);
                const response = yield call(userLogin,payload);
                let nPayload = {};
                if(response.code === 0){
                    
                    Toast.hide();
                    nPayload.isLogin = true;
                    nPayload.userInfo = response.data.profile;

                    nPayload.authentication = true;
                    nPayload.res = response;
                    localStorage.setItem('UTRAFF', JSON.stringify(response.data.profile));
                    localStorage.setItem('UT', JSON.stringify(response.data.token));
                    yield put({
                        type:'save',
                        payload:nPayload
                    })

                    //yield put(routerRedux.push('/'));
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
            *loginCode({payload},{call,put}){
                Toast.loading('',0);
                const response = yield call(userLoginCode,payload);
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
                const response = yield call(getCode, payload);
                if(response.code === 0){
                    Toast.info('短信已发送成功 !!!', 3);
                }else{
                    Toast.info('短信发送失败 !!!', 3);
                }
            },
            *logout({ payload }, { call, put }) {
                Toast.loading('',0)
                const isLogin = {isLogin:false};
                yield put({
                    type:'save',
                    payload:isLogin
                })
                const response = yield call(userLogout);
                console.dir(response);
                let nPayload = {isLogin: false};
                if(response.code == 'SUCCESS'){
                    
                    Toast.hide();
                    localStorage.removeItem('UTRAFF', '');
                    localStorage.removeItem('UT', '');
                    nPayload.res = response;
                    nPayload.userInfo = null;
                    nPayload.authentication = true;
                }else{
                    nPayload.res = response;
                    nPayload.isLogin=false
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
                //yield put(routerRedux.push('/'));
                return <Switch><Redirect to="/login"/></Switch>
               
            },
            *reset({payload},{call,put}){
                const reset = yield call(reSetPassword,payload);
                if(reset.code === 0){
                    Toast.info(reset.msg,1);
                    yield put(routerRedux.push('/user/set'))
                }else{
                    Toast.info('操作失败',1);
                }
            },
            *updateUser( { payload },{ call , put }){
                const response = yield call(updateUser,payload);
                const nPayload = {};
                if(response.code === 0){
                    nPayload.userInfo = response.data;
                    localStorage.setItem('UTRAFF', JSON.stringify(response.data));
                    Toast.info('设置成功！',3)
                }else if(response.status === 401 ){
                    //Toast.info()
                }else{
                    Toast.info('操作失败',3)
                }
                yield put({
                    type:'save',
                    payload:{
                        ...nPayload
                    }
                })
            }
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    