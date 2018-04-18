import { queryList } from '../services/Guide';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'guide',
    
        state: {
            dataList:null,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                //已使用
                dispatch({
                    type:'queryList',
                    payload:{used:1}
                })
                
            }
        },
    
        effects: {
            *queryList({ payload },{ call , put }){
                const response = yield call(queryList,payload);
                let nPayload = {};
                if(response.code === 0){
                    nPayload.dataList = response.data;
                }
                yield put({
                    type:'save',
                    payload:nPayload
                })
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    