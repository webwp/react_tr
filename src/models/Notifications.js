import { getNotifications , getNotificationDetail } from '../services/Notifications';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'notifications',
    
        state: {
            notifications:null,
            isShow:false,
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                dispatch({
                    type:'list',
                    payload:{page:0}
                })
                 
            }
        },
    
        effects: {
            *list({ payload },{ call,put }){
                const JWT = localStorage.getItem('UT');
                if(JWT != null){
                    const nPayload = {};
                    const response = yield call(getNotifications,payload);
                    if(response.code === 0){
                        nPayload.notifications = response.data;
                        nPayload.isShow = true;
                    }
                    
                    yield put({
                        type:'save',
                        payload:{...nPayload}
                    })
                }
                
            },
            *detail({ payload },{ call,put }){
                const nPayload = {};
                const response = yield call(getNotificationDetail,payload);
                if(response.code === 0){
                    nPayload.notifications = response.data;
                    nPayload.isShow = true;
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
    