import React,{Component} from 'react';
import { Button,Result, Icon, WhiteSpace,List } from 'antd-mobile';
import { Modal, WingBlank, Toast,Grid } from 'antd-mobile';

const Item = List.Item;
const myImg = src => <img src={src} style={{'height':'60px','width':'60px'}} className="spe am-icon am-icon-md" alt="" />;
const data = [
    {
        icon:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
        text:'我的二维码',
        other:''
    },
    {
        icon:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
        text:'红包/卡券',
        other:'#/user/coupons/0'
    },
    {
        icon:'',
        text:'余额',
        other:30.5
    }
]

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:''
        }
    }
    handleuUserLogout = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type:"user/logout",
            payload:''
        })
    }
    
    render(){
        const { user } = this.props;
        if(user.res){
            Toast.info(user.res.msg)
        }
        return(
            <div className="result-example custom">
                <Result
                img={myImg('../src/assets/user_1206721_easyicon.net.svg')}
                title={user.userInfo!=null?user.userInfo.phone:"游客"}
                message = {user.userInfo!=null?<Button type="" inline size="small">实名认证</Button>:<a href='#/login'>登录/注册</a>}
                />

                <Grid
                    data={data}
                    columnNum='3'
                    hasLine={false}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                         <a href={dataItem.other}>
                          {typeof dataItem.other=='number'?<strong style={{ width:'100%',height:'48px','display':'inline-block','lineHeight':'48px','color':'red'}}>{dataItem.other}</strong>:<img src={dataItem.icon} style={{ width: '48px', height: '48px' }} alt="" />}
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            <span>{dataItem.text}</span>
                          </div>
                          </a>
                        </div>
                      )}
                />
                <List renderHeader={() => '用户信息'}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        extra="李四"
                        onClick={() => {}}
                    >实名认证</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    ><a href="#/user/bill/0">账单</a></Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    ><a href="#/user/contactinfo/0">常用游客信息</a></Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >银行卡</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >意见反馈</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        arrow="horizontal"
                    >
                    <a href="#/user/about">关于我们</a>
                    </Item>
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