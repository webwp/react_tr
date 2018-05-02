import { getNews,getDetail ,getReminds} from '../services/Index';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'remind',
    
        state: {
            reminds:null,
            isShow:false,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type:'getReminds',
                    payload:{page:0}
                })
                 
            }
        },
    
        effects: {
            *getReminds({ payload },{ call,put }){
                const JWT = localStorage.getItem('UT');
                const nPayload = {};
                if(JWT != null ){
                    const response = yield call(getReminds,payload);
                    if(response.code === 0){
                        nPayload.reminds = response;
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
    