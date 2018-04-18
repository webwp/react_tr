import { queryList } from '../services/Coupons';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'coupons',
    
        state: {
            donUse:null,
            readyUsr:null,
            overdue:null,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                //已使用
                dispatch({
                    type:'readyUsr',
                    payload:{used:1}
                })
                //未使用
                dispatch({
                    type:'donUse',
                    payload:{used:0}
                })
                //已过期
                dispatch({
                    type:'overdue',
                    payload:{expired:1}
                })
            }
        },
    
        effects: {
            *readyUsr({ payload },{ call , put }){
                const response = yield call(queryList,payload);
                let nPayload = {};
                if(response.code === 0){
                    nPayload.readyUsr = response.data;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            },
            *donUse({ payload },{ call , put }){
                const response = yield call(queryList,payload);
                let nPayload = {};
                if(response.code === 0){
                    nPayload.donUse = response.data;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            },
            *overdue({ payload },{ call , put }){
                const response = yield call(queryList,payload);
                let nPayload = {};
                if(response.code === 0){
                    nPayload.overdue = response.data;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            }
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    