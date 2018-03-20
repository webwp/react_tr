import { userLogin,userReg,getCode } from '../services/api';

export default {
    
        namespace: 'example',
    
        state: {
            userInfo:'',
            collapsed: false,
            loading: true,
            authLoading: false,
            profile: null,
        },
    
        subscriptions: {
            
        },
    
        effects: {
            *fetch({ payload }, { call, put }) {  // eslint-disable-line
                yield put({ type: 'save' });
            },
            *fetchConfig({ payload }, { call, put }) {
                
            },
            *reg({ payload },{ call, put }){
                yield put({
                    type: 'save',
                    payload: {authLoading: true},
                });
                const response = yield call(userReg, payload);
                let nPayload = {authLoading: false};
                if (response.code == 'SUCCESS') {
                    nPayload.userInfo = response.data;
                    nPayload.authLoading=true;
                    localStorage.setItem('UTRAFF', response.data);
                }
                yield put({
                    type: 'save',
                    payload: nPayload
                });
            },
            *login({ payload }, { call, put }) {
            },
            *code({ payload },{ call,put }){
                const response = yield call(getCode, payload);
            },
            *logout({ payload }, { call, put }) {
                
            },
            
        },
    
        reducers: {
            save(state, action) {
            	return { ...state, ...action.payload };
      		},
            
        },
    
    };
    