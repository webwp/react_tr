import React , { Component } from 'react';
import Page from '../../../components/Page'

class Index extends Component{
    render(){
        const { history } = this.props;
        const others = {mode:'light'};
        return(
           <Page title="我的二维码" history={history} _bool={true} others={others}>
                <div style={{textAlign:'center',marginTop:'120px'}}>
                    <img src='image/1525175853.png' width="220" height='220' />
                    <p className="mt20">请使用二维码搭乘公交、旅游码头游轮</p>
                </div>
           </Page>
        )
    }
}
export default Index;