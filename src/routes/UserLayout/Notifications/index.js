import React , { Component } from 'react';
import { connect } from 'dva';
import { List , Badge } from 'antd-mobile';

import Page from '../../../components/Page';

const Item = List.Item;

@connect(state =>({
    nots:state.notifications
}))
class Index extends Component{

    render(){
        const { history , nots } = this.props;
        const { notifications } = nots; 
        if(notifications == null){
            return false;
        }
        const others = {mode:'light'};
        return(
           <Page title="消息中心" _bool={true} others={others} history={history} >
           <List className="my-list">
                {(notifications.total) !=0 ? notifications.data.map((item,index)=>(
                    <Item align="top" thumb={"item.uri"} multipleLine>
                       {item.is_read==0?<Badge dot />:''} {item.title} 
                    </Item>
                ))
                :
                <p className='txt-c txt-color-assist no-data' style={{background:'#F5F5F5'}}>无相关数据</p>
                }
                
            </List>
           </Page>
        )
    }
}
export default Index;