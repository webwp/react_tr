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
    render(){
        const { history , Wallet } = this.props;
        const { wallet } = Wallet;
        if(wallet == null) {
            return false;
        }
        console.log('-----',Wallet)
        return(
           <Page title="我的二维码" history={history} >
                <div style={{textAlign:'center',marginTop:'50px'}}>
                    <h3>余额</h3>
                    <WhiteSpace />
                    {!wallet.data.balance ? '0.00' : wallet.data.balance}
                    <WhiteSpace />
                       <Button type="primary">充值</Button><WhiteSpace />
                </div>
           </Page>
        )
    }
}
export default Index;