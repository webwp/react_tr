import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

import LoginCode from '../../components/User/loginCode';
import LoginPassword from '../../components/User/loginPassword';
import Header from '../../components/Other/Header';


const tabs = [
  { title: '快捷登录' },
  { title: '密码登录' },
];
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}

@connect(state => ({
  app: state.user
}))



class Index extends Component {
    submit = (value) => {
        value.phone = value.phone.replace(/\s+/g,"");
        let dispatch_typs = value.password ? 'user/login' : 'user/loginCode'
        if(value.password){

        }
        const { dispatch } = this.props;
        dispatch({
          type: 'user/login',
          payload: {
            ...value
          }
        });
    }
    handleMessage(e) {
      this.setState({webViewData: e.nativeEvent.data});
    }
    loadingToast(msg) {
      Toast.loading(msg, 1, (msg) => {
        console.log('Load complete !!!');
      });
    }
    loadingFaile(msg) {
        Toast.fail(msg, 1);
    }

    render(){
        const { app } = this.props;
        if(app.res){
           app.res.code=='SUCCESS' ? this.props.history.goBack():Toast.info(app.res.msg);
        }
        return(
          <div className="loginBox custom">
            <Header {...this.props} headerTxt='登录' />
            <StickyContainer className='custom-pad-0-25 mt80' style={{height:'60%'}}>
                <Tabs tabs={tabs}
                  initalPage={'t2'}
                  renderTabBar={renderTabBar}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff' }}>
                      <LoginCode {...this.props} onSubmit={this.submit.bind(this)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff' }}>
                      <LoginPassword {...this.props} onSubmit={this.submit.bind(this)}/>
                  </div>
                  
                </Tabs>
                
            </StickyContainer>

                
          </div>
        );
    }
}

export default Index;