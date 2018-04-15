import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

const AgreeItem = Checkbox.AgreeItem;

class LoginCode extends Component{
    constructor(props){
        super(props);
        this.state = {
            codeText:'获取验证码',
            disabled:false
        }
    }
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
    //获取手机验证码
    getCode = (e)=>{
        
        const phone = this.Phone.props.value,
              { dispatch } = this.props;
        if( typeof phone != "undefined" || phone != null){
            dispatch({
                type:'user/code',
                payload:{phone:phone.replace(/\s+/g,"")}
            })
            Toast.loading();
            let _this = this,times = 10;
            let index = setInterval(function(){
                Toast.hide();
                _this.setState({
                    codeText:times<10 ? '0'+times+'秒后可获取':times+'秒后可获取',
                    disabled:true
                })
                times--;
                if(times < 0){
                    clearInterval(index);
                    _this.setState({
                        codeText:'获取验证码',
                        disabled:false
                    })
                }
            },1000);
        }else{
            Toast.info('手机号码不能为空',2)
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
                    ref={el => this.Phone = el}
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
                >验证码<Button disabled={this.state.disabled} type='primary' className="getCode" onClick={this.getCode} size='small'>{this.state.codeText}</Button></InputItem>

                {(errors = getFieldError('code')) ? errors.join(',') : null}
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
                <p style={{textAlign:'right',marginTop:"15px"}}>还不是会员 <a href="#/reg" >立即注册</a></p>
            </List>
        )
    }
}
const reLoginCode = createForm()(LoginCode);
export default reLoginCode;