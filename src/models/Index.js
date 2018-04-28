import { routerRedux,Redirect,Switch } from 'dva/router';
import { Toast } from 'antd-mobile';

import { getNews,getDetail ,getMessage} from '../services/Index';



export default {
    
        namespace: 'index',
    
        state: {
            news:null,   //资讯
            details:null,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type: 'getTab',
                });
                dispatch({
                    type:'news',
                    payload:{page:1,per_page:10}
                });
            },
        },
    
        effects: {
            *news( { payload },{ call , put } ){
                
                const response = yield call(getNews,payload);
                const nPayload = {};
                if(response.code === 0){
                    nPayload.news = response;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            },
            *detail( { payload },{ call,put } ){
                const response = yield call(getDetail,payload);
                let nPayload = {};
                if(response.code === 0){
                     nPayload.details = response;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            },
            *tab({ payload }, { call, put }){
                localStorage.setItem('TAB',JSON.stringify(payload));
                yield put({
                    type:'save',
                    payload:payload
                })
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    