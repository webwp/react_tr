import React , { Component } from 'react';
import { NoticeBar , Icon , InputItem , List , WhiteSpace , Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Page from '../../../components/Page'


const cart_id = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
class Index extends Component{
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            
        })
    }
    //页面跳转
    pageJump = (url)=>{
        const { history } = this.props;
        history.push(url);
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
                            {...getFieldProps('name',{rules:[{required:true,msg:'姓名不能为空'}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='text'
                            placeholder="请输入您的真实姓名"
                            ref={'name'}
                            error={(errors = getFieldError('name'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >姓名</InputItem>
                        <InputItem style={{'marginTop':'-1px'}}
                            {...getFieldProps('cart_id',{rules:[{required:true,msg:'密码不能为空'},{pattern:cart_id,msg:"请输入6~12个字符，数字加字母"}]})} //{pattern:/^[A-Za-z0-9]w(5,17)$/,msg:'数字与字母组合，至少6位'}
                            clear
                            type='text'
                            placeholder="请输入您的身份证号"
                            ref={'cart_id'}
                            error={(errors = getFieldError('cart_id'))}
                            //extra={<i onClick={this.onShowPass} style={{background:`url(${this.state.showPass?'image/login/Close.png':'image/login/display.png'}) center center no-repeat`,width:'32px',height:'22px',display:'inline-block'}}></i>}
                        >身份证</InputItem>
                    </List>
                    <WhiteSpace />
                    <div style={{padding:'25px 15px 0 15px'}}>
                        <Button type='primary' className='am-button-green' onClick={()=>this.pageJump('/user/certification/next')}>下一步</Button>
                    </div>
                </div>
            </Page>
        )
    }
}
const indexForm = createForm()(Index);
export default indexForm;