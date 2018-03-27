import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';
import { PasswordEncryption } from '../../common/PasswordEncryption';

const AgreeItem = Checkbox.AgreeItem;
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
    submit = () => {
        this.props.form.validateFields((error, value) => {
          //console.log(error,value);

          //对提交的密码进行简单加密处理
          if(!error){
              value.phone = value.phone.replace(/\s+/g,"");
              //对提交的密码进行简单加密处理
              value.password = PasswordEncryption(value.password);
              console.log(this.props)
              const { dispatch } = this.props;
              dispatch({
                type: 'user/login',
                payload: {
                  ...value
                }
              });
          }
        });
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
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
          <div className="loginBox custom">
            <div className="loginImg">
                  <img src="../src/assets/login-logo.jpg" />
                  <h3>南宁智慧公交</h3>
            </div>
            <StickyContainer>
                <Tabs tabs={tabs}
                  initalPage={'t2'}
                  renderTabBar={renderTabBar}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                      <List  style={{ margin: '5px 0', backgroundColor: 'white !important','width':'80%','border':'none' }}>
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('phone', {
                                rules: [{required: true, message: '手机号码或者帐户名不能为空'}],
                              })}
                              clear
                              type="phone"
                              placeholder="手机号码"
                              ref={el => this.autoFocusInst = el}
                              name="phone"
                              error={(errors = getFieldError('phone'))}
                          ></InputItem>
                          
                          <InputItem
                              {...getFieldProps('password', {
                                rules: [{required: true, message: '密码不能为空'}],
                              })}
                              clear
                              placeholder="密码"
                              type='password'
                              ref={el => this.customFocusInst = el}
                          ></InputItem>
                          {(errors = getFieldError('password')) ? errors.join(',') : null}
                          <WhiteSpace />
                          <div style={{"display": "block",'height':'35px'}}>
                              <span href="/reg" className='right lineH42' >忘记密码?</span>
                              <AgreeItem
                              {...getFieldProps('remember')}
                              style={{'float':'left'}}
                              >
                              记住我
                              </AgreeItem>
                          </div>
                          <WhiteSpace />
                          <Button type='primary' onClick={this.submit}>登录</Button>
                    
                      </List>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    Content of second tab
                  </div>
                </Tabs>
            </StickyContainer>
            <div className="marginBottom"><a href="#/reg" >新用户注册</a><a href="#/">首页</a></div>
          </div>
        );
    }
}
const Login = createForm()(Index);
export default Login;