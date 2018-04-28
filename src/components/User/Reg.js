import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';
import { Link } from 'dva/router'
import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs , Modal} from 'antd-mobile';
import { createForm } from 'rc-form';

import Page from '../Page'

const AgreeItem = Checkbox.AgreeItem;
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
}
class Reg extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hasError:false,
            value:'',
            modal1: false,
            content:"协议内容",
            modalTitle:"《出行南宁会员服务协议》",
            codeText:'获取验证码',
            disabled:false,
            showPass:false,
            inputType:false,
            showError:true,
            hasError:false,
        };
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }
    //提交表单数据
    submit = ()=>{
        if(this.props.onSubmit){
            this.props.form.validateFields((error,value)=>{
                value.password != value.repassword ?
                this.setState({hasError:!this.state.hasError,showError:!this.state.showError})
                :
                this.setState({hasError:!this.state.hasError,showError:!this.state.showError});
                if(value.password == value.repassword){
                    if(!error){
                        value.register_from = 'wechat';
                        this.props.onSubmit(value);
                    }else{
                        Toast.info('请确保信息完整！',3)
                    }
                }else{
                    Toast.info('两次密码输入不一致！',2)
                    this.setState({
                        hasError:true
                    })
                }
                
            })
        }
    }
    //获取手机验证码
    getCode = (e)=>{
        const phone = this.Phone.props.value,
              { dispatch } = this.props;
        
        if( typeof(phone) != 'undefined' ){
            dispatch({
                type:'user/code',
                payload:{phone:phone.replace(/\s+/g,""),type:1}
            })
            Toast.loading();
            let _this = this,times = 10;
            let index = setInterval(function(){
                Toast.hide();
                _this.setState({
                    codeText:times<60 ? '0'+times+'秒后可获取':times+'秒后可获取',
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
    checkPassword = (value) => {
         let rePassword = this.rePassword;
         if(value !=rePassword.props.value){
             this.setState({
                 hasError:true
             })
         }else{
             this.setState({
                 hasError:false
             })
         }
          this.setState({
            value,
          });
    }
    
    onShowPass = ()=>{
        this.setState({showPass:!this.state.showPass,passType:!this.state.passType})
    }
    render(){
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        const { history } = this.props;
        const passType = this.state.passType ? 'text':'password';
        return(
        <Page title="用户注册" others={{mode:'light'}} _bool={true} history={history} borderBottom={true}>
        <div className="custom" style={{backgroundColor:'white',height:'100%'}}>

            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <List  className='custom-form custom-form-input' style={{height:'100%', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          
                <InputItem
                    {...getFieldProps('phone', {
                    rules: [{required: true, message: '手机号码不能为空'},{min: 13, message: '11位手机号码'}],
                    })}
                    clear
                    type="phone"
                    placeholder="手机号码"
                    labelNumber={2}
                    ref={el => this.Phone = el}
                    name="phone"
                    error={(errors = getFieldError('phone'))}
                ><img src="image/login/phone@2x.png" /></InputItem>
                {/* {(errors = getFieldError('phone')) ? errors.join(',') : null} */}
                <InputItem
                    {...getFieldProps('sms_captcha', {
                    rules: [{required: true, message: '验证码不能为空'}],
                    })}
                    clear
                    placeholder="验证码"
                    type='text'
                    labelNumber={2}
                    error={(errors = getFieldError('sms_captcha'))}
                    ref={el => this.customFocusInst = el}
                    extra={<span disabled={this.state.disabled} style={{color:this.state.disabled ? "#ccc":"#39bc30"}}  onClick={this.getCode}>{this.state.codeText}</span>}
                >
                <img src='image/login/Verification@2x.png' />
                </InputItem>
                <InputItem
                    {...getFieldProps('password', {
                    rules: [{required: true, message: '密码不能为空'},{regExp:/^[a-zA-Z]\w{5,17}$/,message:'fu'}
                      ],
                    })}
                    clear
                    type={passType}
                    placeholder="密码"
                    labelNumber={2}
                    ref={el => this.rePassword = el}
                    error={(errors = getFieldError('password'))}
                    extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                ><img src="image/login/lock@2x.png" /></InputItem>
                {/* {(errors = getFieldError('password')) ? errors.join(',') : null} */}
                <InputItem
                    {...getFieldProps('repassword', {trigger:'onChange',
                    rules: [{required: true, message: '密码不一致'}],
                    })}
                    clear
                    onBlur={this.checkPassword}
                    type={passType}
                    placeholder="重复密码"
                    labelNumber={2}

                    error={(errors = getFieldError('repassword'))}
                    //onChange={this.checkPassword}
                    //value={this.state.value}
                    //ref={el => this.autoFocusInst = el}
                    error={this.state.hasError}
                ><img src="image/login/lock@2x.png" /></InputItem>
                {/* {(errors = getFieldError('repassword')) ? errors.join(',') : null} */}
                {errors}
                {/* <Flex>
                    <Flex.Item>
                        <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                        我已阅读并确认<a onClick={this.showModal('modal1')} style={{color:'#108ee9'}}>《出行南宁会员服务协议》</a>
                        </AgreeItem>
                    </Flex.Item>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('modal1')}
                        title={this.state.modalTitle}
                        footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div style={{ height: 100, overflow: 'scroll' }}>
                            {this.state.content}
                        </div>
                    </Modal>
                </Flex> */}
                <WhiteSpace />
                <div style={{padding:'25px 15px 0 15px'}}>
                    <div className="txt-c opt" style={{lineHeight:'48px'}}>
                    <input className="magic-checkbox" type="checkbox" name="layout" id="c2" />
				    <label htmlFor="c2">我已阅读并确认</label>
                    <Link className="txt-color-green-big dispay-inline" to="/agreement">《出行南宁会员服务协议》</Link>
                    </div>
                    <Button type='primary' className='am-button-green' onClick={this.submit}>注册</Button>
                    <div className="txt-r opt" style={{lineHeight:'48px',padding:'0 1.5em'}}>
                    我是会员，
                    <Link className="txt-color-green-big dispay-inline" to="/login">立即登录</Link>
                    </div>
                </div>

            </List>
        </div>
        </Page>
        )
    }
}
const setReg = createForm()(Reg);
export default setReg;