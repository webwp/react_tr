import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

const AgreeItem = Checkbox.AgreeItem;

class LoginCode extends Component{
    //提交表单数据
    submit = ()=>{
        if(this.props.onSubmit){
            this.props.form.validateFields((error,value)=>{
                if(!error){
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
                    {...getFieldProps('code', {
                    rules: [{required: true, message: '验证码不能为空'}],
                    })}
                    clear
                    placeholder="验证码"
                    type='text'
                    ref={el => this.customFocusInst = el}
                    style={{width:'70%'}}
                >验证码<Button type='primary' className="getCode" size='small'>获取验证码</Button></InputItem>

                {(errors = getFieldError('password')) ? errors.join(',') : null}
                <WhiteSpace />
                <div style={{"display": "block",'height':'35px'}}>
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
const setLoginCode = createForm()(LoginCode);
export default setLoginCode;