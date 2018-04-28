import React , { Component } from 'react';
import { NoticeBar , Icon , InputItem , List , WhiteSpace , Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Page from '../../../components/Page'

class Index extends Component{
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            
        })
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
                            {...getFieldProps('password',{rules:[{required:true,msg:'密码不能为空'},{pattern:/^[A-Za-z0-9]{6,12}$/,msg:"请输入6~12个字符，数字加字母"}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='text'
                            placeholder="请输入您的真实姓名"
                            ref={'password'}
                            error={(errors = getFieldError('password'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >姓名</InputItem>
                        <InputItem style={{'marginTop':'-1px'}}
                            {...getFieldProps('password',{rules:[{required:true,msg:'密码不能为空'},{pattern:/^[A-Za-z0-9]{6,12}$/,msg:"请输入6~12个字符，数字加字母"}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='text'
                            placeholder="请输入您的身份证号)"
                            ref={'password'}
                            error={(errors = getFieldError('password'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >身份证</InputItem>
                    </List>
                    <WhiteSpace />
                    <div style={{padding:'25px 15px 0 15px'}}>
                        <Button type='primary' className='am-button-green' onClick={this.submit}>下一步</Button>
                    </div>
                </div>
            </Page>
        )
    }
}
const indexForm = createForm()(Index);
export default indexForm;