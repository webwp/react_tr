import React , { Component } from 'react';
import { List , Button, WhiteSpace, WingBlank ,Modal} from 'antd-mobile';
import { connect } from 'dva';
import { Link,Redirect } from 'dva/router';
import Page from '../../../components/Page';

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
        const { user,history } = this.props
        const { userInfo } = user
        if(userInfo == null){
            return false;
        }
        //Page 设置
        const page = {canGoBack:true,mode:'light'}
        return(
            <Page title="设置" others={page} history={history} _bool={true}>
                <WhiteSpace />
                <List className="my-list set-list-img">
                    <Item extra={<i className="iconfont icon-iconfontzhizuobiaozhun023104 fz-general-sm" alt="" />} multipleLine onClick={() => {}}>
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
                        type='warning'
                        onClick={() =>
                            alert('操作', '退出当前用户', [
                            { text: '取消', onPress:()=>{}},
                            { text: '确定', onPress: this.handleuUserLogout },
                            ])
                        }
                    >
                        退出登录
                    </Button>
                </WingBlank>
            </Page>
        )
    }
}

export default Index;