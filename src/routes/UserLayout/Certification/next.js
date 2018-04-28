import React , { Component } from 'react';
import { NoticeBar , Icon , InputItem , List , WhiteSpace , Button , Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Page from '../../../components/Page'

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            codeText:'获取验证码',
            disabled:false,
        }
    }
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            
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
    render(){
        const { history } = this.props;
        const others = {mode:'light'};
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        return (
            <Page title='实名认证' history={history} others={others} _bool={true} borderBottom={true}>
                <NoticeBar mode="closable" marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                   | 温馨提示：请确保认证信息为会员本人~
                </NoticeBar>
                <div className="custom">
                    <List className="custom-form custom-form-input">
                        <InputItem style={{'marginTop':'-1px'}}
                            {...getFieldProps('bankCard',{rules:[{required:true,msg:'密码不能为空'},{pattern:/^[A-Za-z0-9]{6,12}$/,msg:"请输入6~12个字符，数字加字母"}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='bankCard'
                            placeholder="请输入您的银行卡号"
                            ref={'password'}
                            error={(errors = getFieldError('bankCard'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >银行卡号</InputItem>
                        <InputItem style={{'marginTop':'-1px'}}
                            {...getFieldProps('phone',{rules:[{required:true,msg:'手机号不能为空'}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='phone'
                            placeholder="请输入银行卡预留手机号码"
                            error={(errors = getFieldError('phone'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >手机号</InputItem>
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
                          验证码
                          </InputItem>
                    </List>
                    <WhiteSpace />
                    <div style={{padding:'25px 15px 0 15px'}}>
                        <Button type='primary' className='am-button-green' onClick={this.submit}>提交验证</Button>
                    </div>
                </div>
            </Page>
        )
    }
}
const indexForm = createForm()(Index);
export default indexForm;