import React,{Component} from 'react';
import { Link } from 'dva/router';
import { Button,Result, Icon, WhiteSpace,List,Badge ,Modal, WingBlank, Toast,Grid} from 'antd-mobile';

const Item = List.Item;
const myImg = src => <img src={src} style={{'height':'60px','width':'60px'}} className="spe am-icon am-icon-md" alt="" />;


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
        const { user } = this.props;
        const { wallet } = user;
        const data = [
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
                text:'我的二维码',
                url:'/user/mycode',
                other:''
            },
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
                text:'红包/卡券',
                url:'/user/coupons',
                other:''
            },
            {
                icon:'',
                text:'余额',
                url:'/user/wallet',
                other:wallet == null ? '0.00' : (wallet.data.balance==null? '0.00':wallet.data.balance) 
            }
        ]
        return(
            <div className="result-example custom">
                
                     
                <div className="am-result">
                    <div className='custom-user'>
                        <Badge text={10} className='left'>
                            <Link className='left' badge={1} to='/message'><i className="iconfont icon-xiaoxi"></i></Link>
                        </Badge>
                        <span className='right' onClick={()=>{this.authCheck('/user/set')}}><i className="iconfont icon-setup"></i></span>
                    </div>
                    <div className="am-result-pic">
                        <img src="../src/assets/user_1206721_easyicon.net.svg" className="spe am-icon am-icon-md" alt="" style={{height: '60px', width: "60px"}} />
                    </div>
                    <div className="am-result-title">{user.userInfo!=null?user.userInfo.phone:"游客"}</div>
                    <div className="am-result-message">{user.userInfo!=null?<Button type="" inline size="small">实名认证</Button>:<Link to='/login'>登录/注册</Link>}</div>
                </div>

                <Grid
                    data={data}
                    columnNum='3'
                    hasLine={false}
                    onClick={_el => this.authCheck(_el.url)}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }} >
                         
                          { dataItem.other!=''?<strong style={{ width:'100%',height:'48px','display':'inline-block','lineHeight':'48px','color':'red'}}>{dataItem.other}</strong>:<img src={dataItem.icon} style={{ width: '48px', height: '48px' }} alt="" />}
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
                        extra="李四"
                        onClick={() => this.authCheck('')}
                    >实名认证</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/bill') }
                    >账单</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/contactinfo/') }
                    >常用游客信息</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('')}
                    >银行卡</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/feelback')}
                    >意见反馈</Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        arrow="horizontal"
                    >
                    <a href="#/user/about">关于我们</a>
                    </Item>
                    
                </List>
            </div>
        )
    }
}

export default Index;