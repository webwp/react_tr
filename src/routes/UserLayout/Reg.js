import React,{Component} from 'react';
import {connect} from 'dva';
import { List, InputItem, WhiteSpace,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import history from 'history/createHashHistory' ;
import Res from "../../components/Res";

@connect(state=>({
  app:state.app
}))

class Index extends Component {
    state = {
        hasError: false,
        value: '',
        text:"获取验证码",
    }
    onErrorClick = () => {
        if (this.state.hasError) {
          Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            hasError: false,
          });
        }
        this.setState({
          value,
        });
    }
    handleChange = (e) => {
        
    }
    loadingToast(msg) {
      Toast.loading(msg, 1, (msg) => {
        console.log('Load complete !!!');
      });
    }
    submit = () => {
          this.props.form.validateFields((error, value) => {
            //console.log('error:',error)
            //this.props.form.getFieldInstance('userName')
            value.phone = value.phone.replace(/\s+/g,"");
            if(!error){
                this.loadingToast();
                const { dispatch } = this.props;
                dispatch({
                  type:'app/reg',
                  payload:{
                    ...value
                  }
                })
            }
          });
    }
    hadleGetCode = (e)=>{
      const  phone =this.props.form.getFieldProps('phone').value;
      const thisDom = e.target;
      if(phone!=''){
          const { dispatch } = this.props;
          dispatch({
              type:"app/code",
              payload:{ phone:phone.replace(/\s+/g,"")}
          })
          thisDom.parentNode.style.pointerEvents='none';
          this.loadingToast("短信已发出~");
          var m=60;
          var ms = this;
          var index = setInterval(function(){ 
              m--;
              var txt = m+"秒后可重发";
              ms.setState({text:txt})
              if(m==0){
                clearInterval(index);
                ms.setState({text:"获取验证码"});
                thisDom.parentNode.style.pointerEvents='auto';
              }
          }, 1000);
      }
      
      
    }
    render(){
        let errors;
        const { getFieldProps,getFieldError } = this.props.form;
        const {app} = this.props;
        if (app.authLoading) return <Res {...this.props} />;
        return(
          <div className="loginBox">
          <div className="loginImg">
                <img src="../src/assets/login-logo.jpg" />
                <h3>南宁智慧公交</h3>
          </div>
            <List  style={{ margin: '5px 0', backgroundColor: 'white' }}>
            {/* <InputItem
              {...getFieldProps('userName', {
                rules: [{required: true, message: '登录用户名不能为空'}],
              })}
              clear
              placeholder="用户名"
              ref={el => this.autoFocusInst = el}
              name="userName"
            >用户名</InputItem> */}
            <InputItem
            {...getFieldProps('phone',
                {rules:[{
                  required: true, message: '手机号码不能为空',
                }]}
            )}
            type="phone"
            placeholder="186 1234 1234"
            >手机号码</InputItem>
            {(errors = getFieldError('phone')) ? errors.join(',') : null}
            <InputItem style={{'border':'none'}}
              {...getFieldProps('password', {
                onChange(){},
                rules: [{required: true,min: 6, message: '请至少填写6'}],
              })}
              clear
              placeholder="密码"
              type='password'
              ref={el => this.customFocusInst = el}
            >密码</InputItem>
            {/* <InputItem style={{'border':'none'}}
              {...getFieldProps('repassword', {
                onChange(){},
                rules: [{required: true, message: '密码不能为空'}],
              })}
              clear
              placeholder="密码"
              type='password'
              ref={el => this.customFocusInst = el}
            >确认密码</InputItem> */}
            {(errors = getFieldError('repassword')) ? errors.join(',') : null}
            
            <List.Item style={{'border':'none'}}
              extra={<Button size="small" onClick={this.hadleGetCode} inline>{this.state.text}</Button>}
              multipleLine
              style={{'paddingLeft':0}}
            >
              <InputItem style={{'border':'none'}}
                {...getFieldProps('code', {
                  rules: [{required: true, message: '验证码不能为空'}],
                })}
                clear
                placeholder="验证码"
                ref={el => this.customFocusInst = el}
              >验证码</InputItem>
            </List.Item>
            <List.Item style={{'border':'none'}}>
              <Button type='primary' onClick={this.submit}>注册</Button>
              <WhiteSpace />
              <Button onClick={()=>{history.back();}}>取消</Button>
            </List.Item>

          </List>
          </div>
        );
    }
}
const Reg = createForm()(Index);
export default Reg;