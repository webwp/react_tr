import { queryList } from "../services/Applications";
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'indexPage',
    
        state: {
            selectedTab:'',
            Applications:null,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type: 'getTab',
                });
                dispatch({
                    type:'queryList'
                })
            },
        },
    
        effects: {
            *queryList({ payload }, { call, put }){
                
                const response = yield call(queryList,payload);
                const nPayload = {};
                if(response.code === 0){
                    nPayload.Applications = response.data;
                }
                yield put({
                    type:'save',
                    payload:{...nPayload}
                })
            },
            *tab({ payload }, { call, put }){
                localStorage.setItem('TAB',JSON.stringify(payload));
                yield put({
                    type:'save',
                    payload:payload
                })
            },
            *getTab({ payload },{ put }){
                const nPayload = JSON.parse(localStorage.getItem('TAB'));
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
    