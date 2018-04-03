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
                     this.props.onSubmit({});
                 }
            })
        
        }
        
    }
    render(){
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
            <List  style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
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
                >手机号</InputItem>

                <InputItem
                    {...getFieldProps('password', {
                    rules: [{required: true, message: '密码不能为空'}],
                    })}
                    clear
                    placeholder="密码"
                    type='password'
                    ref={el => this.customFocusInst = el}
                >密码</InputItem>
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
        )
    }
}
const setLoginPassword = createForm()(LoginPassword);
export default setLoginPassword;