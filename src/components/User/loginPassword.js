import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

import { PasswordEncryption } from '../../common/PasswordEncryption';

const AgreeItem = Checkbox.AgreeItem;

class LoginPassword extends Component{
    submit = ()=>{
        //是否props.onSubmit 过来
        if(this.props.onSubmit){
            this.props.form.validateFields((error, value) => {
                //提交表单数据到父组件
                 if(!error){
                     //对提交的密码进行简单加密处理
                     //value.password = PasswordEncryption(value.password);
                     this.props.onSubmit(value);
                 }else{
                     this.props.onSubmit();
                 }
            })
        
        }
        
    }
    render(){
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
            <List className="custom-form-input custom-form-login" style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                <InputItem style={{'marginTop':'-1px'}}
                    {...getFieldProps('phone', {
                    rules: [{required: true, message: '请输入正确的手机号码格式'}],
                    })}
                    clear
                    labelNumber={3}
                    type="phone"
                    placeholder="手机号码"
                    ref={el => this.autoFocusInst = el}
                    name="phone"
                    error={(errors = getFieldError('phone'))}
                ><img src="image/login/phone@2x.png" /></InputItem>

                <InputItem
                    {...getFieldProps('password', {
                    rules: [{required: true, message: '密码不能为空'}],
                    })}
                    clear
                    labelNumber={3}
                    placeholder="密码"
                    type='password'
                    ref={el => this.customFocusInst = el}
                ><img src="image/login/lock@2x.png" /></InputItem>
                <WhiteSpace />
                {/* <div style={{"display": "block",'height':'35px'}}>
                    <span href="/reg" className='right lineH42' >忘记密码?</span>
                    <AgreeItem
                    {...getFieldProps('remember')}
                    style={{'float':'left'}}
                    >
                    记住我
                    </AgreeItem>
                </div> */}
                <WhiteSpace />
                <div style={{lineHeight:'36px',color:'red',height:'36px'}} className="txt-c">
                    {(errors = getFieldError('phone')) ? errors.join(',') : null}
                    {(errors = getFieldError('password')) ? errors.join(',') : null}
                </div>
                <WhiteSpace />
                <Button type='primary' className='am-button-green' onClick={this.submit}>登录</Button>
                <p style={{textAlign:'right',marginTop:"15px",padding:"0 15px"}}>
                    还不是会员 
                    <a href="#/reg" style={{display:'inline-block'}} className="txt-color-green-big">立即注册</a>
                    <a href="#" className="left txt-color-green-big">忘记密码？</a>
                </p>
            </List>
        )
    }
}
const setLoginPassword = createForm()(LoginPassword);
export default setLoginPassword;