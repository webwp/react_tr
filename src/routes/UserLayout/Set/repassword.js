import React , { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { connect } from 'dva';

import Page from '../../../components/Page';

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
            repassword:"",
            hasError:false,
            showPass:false,
            inputType:false,
            showError:true,
        }
    }
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            value.phone = this.state.phone;
            value.password != value.repassword ?
                this.setState({hasError:!this.state.hasError,showError:!this.state.showError})
                :
                this.setState({hasError:!this.state.hasError,showError:!this.state.showError});
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
                type:'setting/code',
                payload:{phone:phone,type:2}
            })
            Toast.loading();
            let _this = this,times = 60;
            let index = setInterval(function(){
                Toast.hide();
                _this.setState({
                    codeText:times<10 ? '0'+times+'秒后重试':times+'秒后重试',
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
   onShowPass = ()=>{
       this.setState({showPass:!this.state.showPass,passType:!this.state.passType})
   }
    render(){
        const { user, history } = this.props;
        const { userInfo } = user;
        const passType = this.state.passType ? 'text':'password';
        if(userInfo==null){
            return false;
        }
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
            <Page title="修改密码" others={{mode:'light'}} _bool={true} history={history}>
                <div className="custom">
                        
                    <List className='custom-form custom-form-input' style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          <List.Item className="repassword-phone">
                              手机号码   {this.plusXing(userInfo.phone,3,4)}
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
                              extra={<span disabled={this.state.disabled} style={{color:this.state.disabled ? "#ccc":"#39bc30"}}  onClick={this.getCode}>{this.state.codeText}</span>}
                          >
                          {/* <Button disabled={this.state.disabled} type='primary' className="getCode" onClick={this.getCode} size='small'>{this.state.codeText}</Button> */}
                          </InputItem>
          
                          {/* {(errors = getFieldError('sms_captcha')) ? errors.join(',') : null} */}
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('password',{rules:[{required:true,msg:'密码不能为空'},{pattern:/^[A-Za-z0-9]{6,12}$/,msg:"请输入6~12个字符，数字加字母"}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                              clear
                              type={passType}
                              placeholder="设置密码(6~12个字符，数字加字母)"
                              ref={'password'}
                              error={(errors = getFieldError('password'))}
                              extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                          ></InputItem>
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('repassword')}
                              clear
                              type={passType}
                              placeholder="确认密码"
                              error={(errors = this.state.hasError)}
                              ref='repassword'
                            //   onChange = {this.onHandleChangeRepassword}
                            //   value={this.state.repassword}
                          ></InputItem>
                          <WhiteSpace />
                          <div style={{lineHeight:'36px',color:'red',height:'36px'}} className="txt-c">{this.state.showError?"":<span className=''>两次输入的密码不一致，请确认</span>}</div>
                          <WhiteSpace />
                          <div style={{padding:'25px 15px 0 15px'}}>
                                <Button type='primary' className='am-button-green' onClick={this.submit}>确定</Button>
                          </div>
                    </List>
                </div>
            </Page>
        )
    }
}
const rePass = createForm()(Index);
export default rePass;