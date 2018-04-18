import { queryList } from '../services/Bill';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'bill',
    
        state: {
            data:null
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                
                 
            }
        },
    
        effects: {
            *getList({ payload },{ call , put }){
                const response = yield call(queryList,payload);
                let nPayload = {};
                if(response.code === 0){
                    nPayload.data = response.data;
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
    