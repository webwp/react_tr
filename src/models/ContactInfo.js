import { queryList,add ,onDel,getPassengers} from '../services/ContactInfo';
import { routerRedux,Redirect,Switch } from 'dva/router';
import QS from 'query-string';
import { Toast } from 'antd-mobile';



export default {
    
        namespace: 'contactInfo',
    
        state: {
            dataList:null,
            detail:null
        },
    
        subscriptions: {
            setup({ dispatch, history }) {
                //数据源
                const {location} = history;
                if(location.pathname==='/user/contactinfo/'){
                    dispatch({
                        type:'getList',
                        payload:{page:1,per_page:20}
                    })
                }
                
                
            }
        },
    
        effects: {
            *getList({ payload },{ call , put }){
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
            *adds({ payload },{ call, put , history}){
                const response = yield call(add,payload);
                if(response.code === 0){
                    Toast.info('添加成功~~',2);
                    yield put(routerRedux.push('/user/contactinfo'));
                    //yield put(routerRedux().push('user/contactinfo'));
                    //return <Switch><Redirect to="/user/contactinfo"/></Switch>
                    //history.push('/user/contactinfo')
                }

            },
            *del({ payload },{ call,put ,dispatch }){
                const response = yield call(onDel,payload);
                if(response.code === 0){
                    Toast.info('删除成功',2);
                    yield put({type:'getList'})
                    
                }else{
                    Toast.info(response.msg,3)
                }
            },
            *getPassengers({ payload },{ call,put }){
                const method = payload.method;
                const response = yield call(getPassengers,payload)
                const nPayload = {};
                if(response.code === 0){
                    nPayload.detail = response;
                    yield put({
                        type:'save',
                        payload:{...nPayload}
                    })
                    if(method === 'PATCH'){
                        Toast.info(response.msg,2)
                        yield put(routerRedux.push('/user/contactinfo'));
                    }
                }else{
                    Toast.info(response.msg,2);
                }
            }
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    