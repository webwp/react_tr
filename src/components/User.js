import React,{Component} from 'react';
import { Button,Result, Icon, WhiteSpace,List } from 'antd-mobile';

const Item = List.Item;
const myImg = src => <img src={src} style={{'height':'60px','width':'60px'}} className="spe am-icon am-icon-md" alt="" />;


class Index extends Component{
    handleuUserLogout = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type:"app/logout",
            payload:''
        })
    }
    render(){
        const { profile } = this.props;
        //console.dir(this.props)
        return(
            <div className="result-example">
                <Result
                img={myImg('../src/assets/user_1206721_easyicon.net.svg')}
                title={"用户名:"+this.props.app.userInfo.phone}
                message=""
                />
                <List renderHeader={() => '用户信息'}>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {}}
                    >修改密码</Item>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={this.handleuUserLogout}
                    arrow="horizontal"
                    >
                    退出当前帐号
                    </Item>
                </List>
            </div>
        )
    }
}

export default Index;