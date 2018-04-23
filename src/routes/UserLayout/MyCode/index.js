import React , { Component } from 'react';
import Page from '../../../components/Page'

class Index extends Component{
    render(){
        const { history } = this.props;
        return(
           <Page title="我的二维码" history={history} >
                <div style={{textAlign:'center',marginTop:'120px'}}>
                    <img src='http://www.duoziwang.com/uploads/userup/27/13Y504U7-9400.jpg' width="220" height='220' />
                    <p className="mt20">请使用二维码搭乘公交、旅游码头游轮</p>
                </div>
           </Page>
        )
    }
}
export default Index;