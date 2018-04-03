import React,{Component} from 'react';
import {connect} from 'dva';
import { Redirect } from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import history from 'history/createHashHistory' ;
import Res from "../../components/Res";
import { PasswordEncryption } from '../../common/PasswordEncryption';
import Reg from '../../components/User/Reg'


// var data = 0;

 
//   function sendData(data) {
//     if (window.originalPostMessage) {
//       window.postMessage(data);
//     } else {
//       throw Error('postMessage接口还未注入');
//     }
//   }
 
//   window.onload = function () {
//     //alert("Reg onload")
//     document.addEventListener('message', function (e) {
//       document.getElementById('data').textContent = e.data;
//     });
//     // document.getElementById('button').onclick = function () {
//     //   data += 100;
//     //   sendData(data);
//     // }
    
//   }

    

  // function sendData(data) {
  //   if (window.originalPostMessage) {
  //     window.postMessage(data);
  //   } else {
  //     throw Error('postMessage接口还未注入');
  //   }
  // }
      
    


@connect(state=>({
  app:state.user
}))

class Index extends Component {
    state = {
        hasError: false,
        value: '',
        text:"获取验证码",
        backPage:false,
        tsss:""
    }
    
    onErrorClick = () => {
        if (this.state.hasError) {
          Toast.info('请输入11位数手机号码');
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
      
          this.props.form.validateFields((error, value) => {
            if(!error){
                //提交的手机号码为180 0780 3076，标准状态需要清楚空格
                value.phone = value.phone.replace(/\s+/g,"");
                //对提交的密码进行简单加密处理
                //value.password = PasswordEncryption(value.password);
                const { dispatch } = this.props;
                dispatch({
                  type:'user/reg',
                  payload:{
                    ...value
                  }
                })
            }
          });
    }
   
    backPage = ()=>{
      //console.log('返回登陆页面');
      this.setState({backPage:true})
      return <Redirect to="/login" />
    }
    componentWillMount(){
      document.addEventListener('message', function (e) {
        document.getElementById('data').textContent = e.data;
      });
      
      //sendData(data);
      // document.addEventListener('message', function (e) {
      //   // document.getElementById('data').textContent = e.data;
      //   this.setState({tsss:e.data});
      // });  
        
    }
    componentDidMount(){
      //alert(window.location.href);
      //alert(window.originalPostMessage)
      //sendData(data);
    }
    
  //  sendToWebview(){
  //      data += 100;
  //      Toast.info(data)
  //      sendData(data);
  //  }

    render(){
      
        let errors;
        const { getFieldProps,getFieldError } = this.props.form;
        const {app} = this.props;
        if (app.authLoading) return <Res {...this.props} />;
        if(this.state.backPage) return <Redirect to="/login" />
        return(
          <div className="loginBox custom">
             <div className="custom-pad-0-25 mt80">
             {/* <button onClick={this.sendToWebview} id="button">发送数据到react native</button>
              <p >收到react native发送的数据: <span id="data"></span></p> */}
             <Reg {...this.props} onSubmit={this.submit.bind(this)} />
                 
             </div>
             
          </div>
        );
    }
}
const reIndex = createForm()(Index);
export default reIndex;