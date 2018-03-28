import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

import LoginCode from '../../components/User/loginCode';
import LoginPassword from '../../components/User/loginPassword';


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
              console.log(value);
              const { dispatch } = this.props;
              // dispatch({
              //   type: 'user/login',
              //   payload: {
              //     ...value
              //   }
              // });
          
        
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
        
        return(
          <div className="loginBox custom">
            
            <StickyContainer className='custom-pad-0-25 mt80' style={{height:'60%'}}>
                <Tabs tabs={tabs}
                  initalPage={'t2'}
                  renderTabBar={renderTabBar}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff' }}>
                      <LoginCode onSubmit={this.submit.bind(this)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff' }}>
                      <LoginPassword onSubmit={this.submit.bind(this)}/>
                  </div>
                </Tabs>
                <div className="marginBottom">
                    <a href="#/reg" >新用户注册</a>
                    <a href="#/">首页</a>
                </div>
            </StickyContainer>

                
          </div>
        );
    }
}

export default Index;