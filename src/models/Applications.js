import { queryList,getApplications } from '../services/Index';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'applications',
    
        state: {
            application:null
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type:'getApplications'
                })
            }
        },
    
        effects: {

            *getApplications({ payload },{ call , put }){
                const response = yield call(getApplications,payload);
                console.log("网络请求：",response); 
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    