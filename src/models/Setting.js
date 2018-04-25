import { userLogin,userReg,getCode,userLogout,userLoginCode,reSetPassword ,updateUser,alreadyUser,getCoupons,Waller} from '../services/User';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'setting',
    
        state: {
            userInfo:null,
        },
    
        subscriptions: {
            
            setup({ dispatch, history }) {
                    dispatch({
                        type:'fetchUser'
                    })
            },
        },
    
        effects: {
            
            *fetchUser({ payload },{ call, put }){
                const response = yield call(alreadyUser,payload);
                const nPayload = {}
                if(response.code === 0){
                    nPayload.userInfo = response.data;
                }
                yield put({
                    type:'save',
                    payload:{...nPayload}
                })
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
            *reset({payload},{call,put}){
                const reset = yield call(reSetPassword,payload);
                if(reset.code === 0){
                    Toast.info(reset.msg,1);
                    yield put(routerRedux.push('/user/set'))
                }else{
                    Toast.info('操作失败',1);
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
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    