import React , { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { connect } from 'dva';

import Header from '../../../components/Other/Header';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;
// const alert = Modal.alert;


@connect(state=>({
    user:state.setting
}))
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            codeText:'获取验证码',
            disabled:false,
            phone:null,
            repassword:'',
            hasError:false
        }
    }
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            value.phone = this.state.phone
            if(!error){
                const { dispatch } = this.props;
                dispatch({
                    type:'setting/reset',
                    payload:{
                        ...value
                    }
                })
                
            }
        })
    }
    //获取手机验证码
    getCode = (e)=>{
        
        const phone = this.props.user.userInfo.phone,
              { dispatch } = this.props;
        if( typeof phone != "undefined" || phone != null){
          
            dispatch({
                type:'repassword/code',
                payload:{phone:phone,type:2}
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
    // 隐藏部分身份证号
    plusXing (str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
        xing+='*';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
   }
   onHandleChangeRepassword = (value)=>{
        const password = this.props.form.getFieldProps('password').value;
        if(value != password){
            this.setState({hasError:true})
        }else{
            this.setState({hasError:false})
        }
        this.setState({
            repassword:value,
        });
   }
    render(){
        const { user } = this.props;
        const { userInfo } = user;
        if(userInfo==null){
            return false;
        }
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
            <div>
                <Header {...this.props} headerTxt="修改密码" />
                <div className="custom-nav-sibling-top custom">
                        
                    <List className='custom-form' style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          <List.Item>
                              手机号    {this.plusXing(userInfo.phone,3,4)}
                          </List.Item>
                          <input type="hidden" {...getFieldProps('phone')} value={this.state.phone=userInfo.phone}/>
                          <InputItem
                              {...getFieldProps('sms_captcha', {
                              rules: [{required: true, message: '验证码不能为空'}],
                              })}
                              clear
                              placeholder="验证码"
                              type='text'
                              ref={el => this.customFocusInst = el}
                              style={{width:'70%'}}
                          >验证码<Button disabled={this.state.disabled} type='primary' className="getCode" onClick={this.getCode} size='small'>{this.state.codeText}</Button></InputItem>
          
                          {(errors = getFieldError('sms_captcha')) ? errors.join(',') : null}
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('password',{rules:[{required:true,msg:'密码不能为空'},]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                              clear
                              type="password"
                              placeholder="设置密码"
                              ref={'password'}
                              error={(errors = getFieldError('password'))}
                          >设置密码</InputItem>
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('repassword')}
                              clear
                              type="password"
                              placeholder="确认密码"
                              error={(errors = this.state.hasError)}
                              ref='repassword'
                              onChange = {this.onHandleChangeRepassword}
                              value={this.state.repassword}
                          >确认密码</InputItem>
                          
                          <WhiteSpace />
                          <Button type='primary' onClick={this.submit}>确定</Button>
                    </List>
                </div>
            </div>
        )
    }
}
const rePass = createForm()(Index);
export default rePass;