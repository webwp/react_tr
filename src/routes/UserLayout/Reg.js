import React,{Component} from 'react';
import {connect} from 'dva';
import { Redirect } from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import history from 'history/createHashHistory' ;
import Res from "../../components/Res";
import { PasswordEncryption } from '../../common/PasswordEncryption';
import Reg from '../../components/User/Reg'

@connect(state=>({
  app:state.user
}))

class Index extends Component {
    state = {
        hasError: false,
        value: '',
        text:"获取验证码",
        backPage:false,
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
      Toast.loading(msg, 1, (msg) => {});
    }
    submit = () => {
      
          // this.props.form.validateFields((error, value) => {
          //   if(!error){
          //       //提交的手机号码为180 0780 3076，标准状态需要清楚空格
          //       value.phone = value.phone.replace(/\s+/g,"");
          //       //对提交的密码进行简单加密处理
          //       value.password = PasswordEncryption(value.password);
          //       const { dispatch } = this.props;
          //       dispatch({
          //         type:'user/reg',
          //         payload:{
          //           ...value
          //         }
          //       })
          //   }
          // });
    }
    hadleGetCode = (e)=>{
      const  phone =this.props.form.getFieldProps('phone').value;
      const thisDom = e.target;
      
      if(phone!=''){
          const { dispatch } = this.props;
          dispatch({
              type:"user/code",
              payload:{ phone:phone.replace(/\s+/g,"")}
          })
          thisDom.parentNode.style.pointerEvents='none';
          var nTime=60;
          var _that = this;

          //设定计时器，获取短信
          var index = setInterval(function(){ 
              nTime--;
              var txt = nTime+"秒后可重发";
              _that.setState({text:txt})
              if(nTime==0){
                clearInterval(index);
                _that.setState({text:"获取验证码"});
                thisDom.parentNode.style.pointerEvents='auto';
              }
          }, 1000);
      }
    }
    backPage = ()=>{
      //console.log('返回登陆页面');
      this.setState({backPage:true})
      return <Redirect to="/login" />
    }
    render(){
        let errors;
        const { getFieldProps,getFieldError } = this.props.form;
        const {app} = this.props;
        if (app.authLoading) return <Res {...this.props} />;
        if(this.state.backPage) return <Redirect to="/login" />
        return(
          <div className="loginBox custom">
             <div className="custom-pad-0-25 mt80">
                 <Reg onSubmit={this.submit.bind(this)} />
             </div>
          </div>
        );
    }
}
const reIndex = createForm()(Index);
export default reIndex;