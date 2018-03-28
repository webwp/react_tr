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
            modalTitle:"《出行南宁会员服务协议》"
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
                if(!error){
                    this.props.onSubmit(value);
                }else{
                    this.props.onSubmit({});
                }
            })
        }
    }
    checkPassword = (value) => {
        console.log(this);
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

                {/* {(errors = getFieldError('password')) ? errors.join(',') : null} */}
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('password', {
                    rules: [{required: true, message: '手机号码或者帐户名不能为空'}],
                    })}
                    clear
                    type="password"
                    placeholder="密码"
                    ref={el => this.rePassword = el}
                    error={(errors = getFieldError('password'))}
                >密码</InputItem>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('repassword', {
                    rules: [{required: true, message: '手机号码或者帐户名不能为空'}],
                    })}
                    clear
                    type="password"
                    placeholder="重复密码"
                    onChange={this.checkPassword}
                    value={this.state.value}
                    //ref={el => this.autoFocusInst = el}
                    error={this.state.hasError}
                >重复密码</InputItem>
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