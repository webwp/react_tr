import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs , Modal} from 'antd-mobile';
import { createForm } from 'rc-form';

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
                console.log(value)
                if(value.password == value.repassword){
                    if(!error){
                        this.props.onSubmit(value);
                    }else{
                        this.props.onSubmit({});
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
    render(){
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return(
            <List  style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          
                <InputItem
                    {...getFieldProps('phone', {
                    rules: [{required: true, message: '手机号码不能为空'},{min: 13, message: '11位手机号码'}],
                    })}
                    clear
                    type="phone"
                    placeholder="手机号码"
                    ref={el => this.Phone = el}
                    name="phone"
                    error={(errors = getFieldError('phone'))}
                >手机号</InputItem>
                {/* {(errors = getFieldError('phone')) ? errors.join(',') : null} */}
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

                
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('password', {
                    rules: [{required: true, message: '密码不能为空'},{regExp:/^[a-zA-Z]\w{5,17}$/,message:'fu'}
                      ],
                    })}
                    clear
                    type="password"
                    placeholder="密码"
                    ref={el => this.rePassword = el}
                    error={(errors = getFieldError('password'))}
                >密码</InputItem>
                {(errors = getFieldError('password')) ? errors.join(',') : null}
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('repassword', {trigger:'onChange',
                    rules: [{required: true, message: '密码不一致'}],
                    })}
                    clear
                    onBlur={this.checkPassword}
                    type="password"
                    placeholder="重复密码"
                    //onChange={this.checkPassword}
                    //value={this.state.value}
                    //ref={el => this.autoFocusInst = el}
                    error={this.state.hasError}
                >重复密码</InputItem>
                {(errors = getFieldError('repassword')) ? errors.join(',') : null}
                <WhiteSpace />
                <Flex>
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
                </Flex>
                <List.Item>
                    
                </List.Item>
                <Button type='primary' onClick={this.submit}>注册</Button>

            </List>
        )
    }
}
const setReg = createForm()(Reg);
export default setReg;