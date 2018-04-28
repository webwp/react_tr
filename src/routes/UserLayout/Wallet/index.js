import React , { Component } from 'react';
import { connect } from "dva";
import Page from '../../../components/Page';

import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
@connect( state => ({
    Wallet:state.user
}))
class Index extends Component{
    componentWillMount =()=>{
        const { dispatch } = this.props;
        dispatch({
            type:'user/wallet',
        })
    }
    //页面跳转
    pageJump = (url)=>{
        const { history } = this.props;
        history.push(url);
    }
    render(){
        const { history , Wallet } = this.props;
        const others = {mode:'light'};
        const { wallet } = Wallet;
        if(wallet == null) {
            return false;
        }
        return(
           <Page title="我的二维码" history={history} others={others} _bool={true} >
                <div style={{textAlign:'center',marginTop:'50px'}}>
                    <h4 className="fz-small-md">账户余额</h4>
                    <WhiteSpace />
                    <div className="txt-color-3 fz-weak-sm">
                    ￥<span className="fz-important-sp">{!wallet.data.balance ? '0.00' : wallet.data.balance}</span>
                    </div>
                    <WhiteSpace />
                    <WhiteSpace />
                    <div style={{padding:'25px 15px 0 15px'}}>
                        <Button type='primary' className='am-button-green' onClick={()=>this.pageJump('/user/wallet/recharge')}>充值</Button>
                    </div>
                </div>
           </Page>
        )
    }
}
export default Index;