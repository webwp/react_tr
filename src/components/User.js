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
        other:''
    },
    {
        icon:'',
        text:'余额',
        other:30.5
    }
]

class Index extends Component{
    constructor(){
        super();
        this.state={
            phone:'',
            authentication:false
        }
    }
    handleuUserLogout = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type:"user/logout",
            payload:''
        })
    }
    componentWillMount(){
        const { user } = this.props;
        const { userInfo } = user;
        //
        if(userInfo !=null || userInfo != ''){
            this.setState({
                phone:userInfo.phone
            })
        }
    }
    render(){
        return(
            <div className="result-example custom">
                <Result
                img={myImg('../src/assets/user_1206721_easyicon.net.svg')}
                title={"用户名:"+this.state.phone}
                message={this.state.authentication != true ? <Button type="" inline size="small">实名认证</Button>:'认证用户'}
                />

                <Grid 
                    data={data} 
                    columnNum='3' 
                    hasLine={false} 
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                          {typeof dataItem.other=='number'?<strong style={{ width:'100%',height:'48px','display':'inline-block','lineHeight':'48px','color':'red'}}>{dataItem.other}</strong>:<img src={dataItem.icon} style={{ width: '48px', height: '48px' }} alt="" />}
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            <span>{dataItem.text}</span>
                          </div>
                        </div>
                      )}
                />
                <List renderHeader={() => '用户信息'}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >账单</Item>
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