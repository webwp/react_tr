import React , { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs,Icon } from 'antd-mobile';
import { connect } from 'dva';

import Page from '../../../components/Page/index';
import Request from '../../../utils/request'

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;
let _bool = true;
// const alert = Modal.alert;
if(window.originalPostMessage){
    //window.APP_CONF.platform = 'kk'
    /*
    * 1、APP请求的页面，首先发送数据给RN  
    * 2、请求api ,判断是登录状态，通过api实现后台登录，返回对应的H5页面
    */
    _bool = false;
    const JWT = localStorage.getItem('UTRAFF');
    Request('http://api.traffic.nnpark.cn/client/profile/info',{nickname:'jj'})
    if(JWT){
        
    }
    
}



@connect(state=>({
    user:state.setting
}))
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            codeText:'获取验证码',
            disabled:false,
            nickname:null
        }
    }
    submit = ()=>{
        this.props.form.validateFields((error,value)=>{
            if(!error){
                const { dispatch } = this.props;
                dispatch({
                    type:'user/updateUser',
                    payload:{
                        ...value
                    }
                })
                
            }
        })
    }
    //获取手机验证码
    getCode = (e)=>{
        
        const phone = this.state.phone,
              { dispatch } = this.props;
        if( typeof phone != "undefined" || phone != null){
          
            dispatch({
                type:'user/code',
                payload:{phone:phone,type:4}
            })
            Toast.loading();
            let _this = this,times = 60;
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
    componentWillMount(){
        const { user } = this.props;
        const { userInfo } = user;
        if(userInfo){
            this.setState({
                phone:userInfo.nickname
            })
        }
        let _this = this;

        //监听及接收RN发送来的数据
        document.addEventListener('message', function (e) {
            switch(e.data){
                case 'onSubmitForApp':
                _this.onSubmitForApp();
                break;
                default:;
            }
        });

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
    testHeadle(){
        this.props.form.validateFields((error,value)=>{
            if(!error){
                const { dispatch } = this.props;
                dispatch({
                    type:'user/updateUser',
                    payload:{
                        ...value
                    }
                })
                
            }
        })
    }
    onSubmitForApp = ()=>{
        this.props.form.validateFields((error,value)=>{
            if(!error){
                value.actApp = "onSubmitApp";
                window.postMessage(JSON.stringify(value))
            }else{
            }
        })
    }
    
    render(){
        /*
        * canGoBack 用与返回按钮
        * act RN导航右边按钮调用H5的函数 onSubmitForApp 为H5函数
        * rightTitle RN导航右边按钮的文字（图标）
        */
        const co = {canGoBack:true,act:'onSubmitForApp',rightTitle:'保存'};
        const {user} =this.props;
        const { userInfo } =user;
        if(userInfo==null){
            return false;
        }
        let errors;
        const { getFieldProps , getFieldError } = this.props.form;
        const right = <div onClick={this.testHeadle.bind(this)} className="txt-color-green-big">保存</div>
        return(
            <Page title='修改昵称' history={this.props.history} right={right} others={{mode:'light'}} onSubmit = {this.testHeadle} _bool={_bool} someThing={co}>
                <div className="custom">
                        
                    <List className='custom-form' style={{ margin: '5px 0', backgroundColor: 'white !important','width':'100%','border':'none' }}>
                          {/* <Item>当前昵称：{userInfo ? userInfo.nickname : '没有设置昵称'}</Item> */}
                          <InputItem style={{'marginTop':'-1px'}}
                              {...getFieldProps('nickname',{initialValue:userInfo ? userInfo.nickname : '没有设置昵称',rules:[{required:true,message:'不能为空'},{min:2,max:32,message:'2~32个字符'}]})}
                              clear
                              error={(errors = getFieldError('nickname'))}
                              type="text"
                              placeholder="请输入昵称"
                              ref={el => this.Phone = el}
                          ></InputItem>
                          
                          {(errors = getFieldError('nickname'))}
                          {/* <Button type='primary' onClick={this.submit}>确定</Button> */}
                    </List>
                    <p className="txt-c txt-color-assist-sm">昵称由2~10个字符的英文、汉字、数字或'-''_'组成</p>
                </div>
            </Page>
        )
    }
}
const rePass = createForm()(Index);
export default rePass;