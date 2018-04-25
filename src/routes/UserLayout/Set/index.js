import React , { Component } from 'react';
import { List , Button, WhiteSpace, WingBlank ,Modal} from 'antd-mobile';
import { connect } from 'dva';
import { Link,Redirect } from 'dva/router';
import Header from '../../../components/Other/Header';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;


@connect(state=>({
    user:state.setting
}))
class Index extends Component{
    handleuUserLogout = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type:"user/logout",
        })
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({
            type:'user/fetchUser',
            payload:{}
        })
    }
    authNav (url) {
		const {  history } = this.props;
		history.push(url);
	}
    
    render(){
        console.log(this.props)
        const { user } = this.props
        const { userInfo } = user
        if(userInfo == null){
            return false;
        }
        return(
            <div>
                <Header {...this.props} headerTxt="设置" />
                <div className="custom-nav-sibling-top">
                <List className="my-list">
                    <Item arrow="horizontal" extra={<img src="../src/assets/user_1206721_easyicon.net.svg" className="spe am-icon am-icon-md" alt="" style={{height: '30px', width: "30px"}} />} multipleLine onClick={() => {}}>
                        头像 
                    </Item>
                    <Item arrow="horizontal" extra={userInfo.nickname} multipleLine  onClick={() => { this.authNav('/user/nickname')}}>
                        昵称
                    </Item>
                    <Item arrow="horizontal" extra="18007803076" multipleLine onClick={() => {}}>
                        绑定手机号 
                    </Item>
                </List>

                <WhiteSpace />
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={()=>{this.authNav('/user/repassword')}}>
                        修改密码
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button 
                        onClick={() =>
                            alert('操作', '退出当前用户', [
                            { text: '取消' },
                            { text: '确定', onPress: this.handleuUserLogout },
                            ])
                        }
                    >
                        退出登录
                    </Button>
                </WingBlank>
                </div>
            </div>
        )
    }
}

export default Index;