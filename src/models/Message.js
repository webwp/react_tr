import { getNews,getDetail ,getMessage} from '../services/Index';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'message',
    
        state: {
            message:null,
            isShow:false,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type:'getMessage',
                    payload:{page:0}
                })
                 
            }
        },
    
        effects: {
            *getMessage({ payload },{ call,put }){
                const JWT = localStorage.getItem('UT');
                const nPayload = {};
                if(JWT){
                    const response = yield call(getMessage,payload);
                    if(response.code === 0){
                        nPayload.message = response;
                        nPayload.isShow = true;
                    }
                }else{
                    nPayload.isShow = false;
                }
                yield put({
                    type:'save',
                    payload:{...nPayload}
                })
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    