import React,{ Component } from 'react';
import { Badge , Modal } from 'antd-mobile';
import { Link } from 'dva/router';
import { connect } from 'dva';

@connect(state =>({
    nots:state.notifications
}))
class UserHeader extends Component {
    //需要登录
    authCheck = (url) => {
        const JWT = localStorage.getItem('UT');
        const _this = this;
        if(JWT){
            this.pageJump(url);
        }else{
            Modal.alert('温馨提示','您需要登录用户',[
                { text:'取消', onPress:()=>{},style:'default'},
                { text:'去登录', onPress:()=>{_this.pageJump('/login')}}
            ])
        }
    }
    //页面跳转
    pageJump = (url)=>{
        const { history } = this.props;
        history.push(url);
    }
    render(){
        //console.log(this.props)
        const { user,nots } = this.props;
        const { notifications } = nots;
        console.log(notifications)
        return (
            <div className="am-result">
                    <div className='custom-user'>
                        <Badge text={notifications!=null?notifications.total:''} className='left'>
                            <i  onClick={()=>this.authCheck('/user/notifications')} className="iconfont icon-xiaoxi fz-general-md"></i>
                        </Badge>
                        <span className='right' onClick={()=>{this.authCheck('/user/set')}}><i className="iconfont icon-setup"></i></span>
                    </div>
                    <div className="am-result-pic">
                        <i className="icon-iconfontzhizuobiaozhun023104 iconfont" style={{color:'#fff'}}></i>
                    </div>
                    <div className="am-result-title">{user.userInfo!=null?user.userInfo.phone:"游客"}</div>
                    <div className="am-result-message">{user.userInfo!=null?<Link to='/' size="small">未实名认证</Link>:<Link to='/login'>登录/注册</Link>}</div>
            </div>
        )
    }
}
export default UserHeader;