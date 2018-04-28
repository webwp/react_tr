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
        if( typeof phone != false && phone != null){
            dispatch({
                type:'user/code',
                payload:{phone:phone.replace(/\s+/g,""),type:2}
            })
            Toast.loading();
            let _this = this,times = 60;
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
            <List className="custom-form-input custom-form-login" style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          
                <InputItem style={{'marginTop':'-1px'}}
                    {...getFieldProps('phone', {
                    rules: [{required: true, message: '手机号码或者帐户名不能为空'}],
                    })}
                    clear
                    labelNumber={3}
                    type="phone"
                    placeholder="手机号码"
                    ref={el => this.Phone = el}
                    name="phone"
                    error={(errors = getFieldError('phone'))}
                ><img src="image/login/phone@2x.png" /></InputItem>
                <InputItem
                    {...getFieldProps('sms_captcha', {
                    rules: [{required: true, message: '验证码不能为空'}],
                    })}
                    clear
                    labelNumber={3}
                    placeholder="验证码"
                    type='text'
                    ref={el => this.customFocusInst = el}
                    extra={<span disabled={this.state.disabled} style={{color:this.state.disabled ? "#ccc":"#39bc30"}}  onClick={this.getCode}>{this.state.codeText}</span>}
                ><img src="image/login/lock@2x.png" /></InputItem>
                <WhiteSpace />
                {/* <div style={{"display": "block",'height':'35px'}}>
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
                    {(errors = getFieldError('sms_captcha')) ? errors.join(',') : null}
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
const reLoginCode = createForm()(LoginCode);
export default reLoginCode;