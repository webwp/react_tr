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
                icon:'image/icon/qrcode.png',
                text:'我的二维码',
                url:'/user/mycode',
                other:''
            },
            {
                icon:'image/icon/Coupon.png',
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
            <div className="result-example custom custom-bg">
                <div className="am-result">
                    <div className='custom-user'>
                        <Badge text={1} className='left'>
                            <i  onClick={()=>this.authCheck('/message')} className="iconfont icon-xiaoxi fz-general-md"></i>
                        </Badge>
                        <span className='right' onClick={()=>{this.authCheck('/user/set')}}><i className="iconfont icon-setup"></i></span>
                    </div>
                    <div className="am-result-pic">
                        <i className="icon-iconfontzhizuobiaozhun023104 iconfont" style={{color:'#fff'}}></i>
                    </div>
                    <div className="am-result-title">{user.userInfo!=null?user.userInfo.phone:"游客"}</div>
                    <div className="am-result-message">{user.userInfo!=null?<Link to='/' inline size="small">未实名认证</Link>:<Link to='/login'>登录/注册</Link>}</div>
                </div>

                <Grid
                    data={data}
                    square={false}
                    columnNum='3'
                    hasLine={false}
                    onClick={_el => this.authCheck(_el.url)}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }} >
                         
                          { dataItem.other!=''?<strong style={{ width:'100%',height:'30px','display':'inline-block','lineHeight':'30px','color':'red'}}>{dataItem.other}</strong>:<img src={dataItem.icon} alt="" />}
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            <span>{dataItem.text}</span>
                          </div>
                        </div>
                      )}
                />
                <WhiteSpace />
                <List>
                    <Item
                        thumb="image/icon/authentication@2x.png"
                        arrow="horizontal"
                        extra="李四"
                        onClick={() => this.authCheck('/user/certification')}
                    >实名认证</Item>
                    <Item
                        thumb="image/icon/bill@2x.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/bill') }
                    >账单</Item>
                    <Item
                        thumb="image/icon/Touristinformation@2x.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/contactinfo/') }
                    >常用游客信息</Item>
                    <Item
                        thumb="image/icon/bankcard@2x.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('')}
                    >银行卡</Item>
                </List>
                <WhiteSpace />
                <List>
                    
                    <Item
                        thumb="image/icon/opinion@2x.png"
                        arrow="horizontal"
                        onClick={() => this.authCheck('/user/feelback')}
                    >意见反馈</Item>
                    <Item
                        thumb="image/icon/aboutus@2x.png"
                        arrow="horizontal"
                    >
                    <a href="#/user/about">关于我们</a>
                    </Item>
                    
                </List>


                <WhiteSpace />
                <WhiteSpace />
                
            </div>
        )
    }
}

export default Index;