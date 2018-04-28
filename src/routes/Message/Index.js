import React , {Component} from 'react';
import { connect } from 'dva';
import {List} from 'antd-mobile'

import Header from '../../components/Other/Header';
import Page from '../../components/Page'
const Item = List.Item;
const Brief = List.Brief
@connect(state=>({
    Message:state.message
}))
class Index extends Component{

    render(){
        const { history,Message } = this.props;
        const { message } = Message;
        const page = {mode:'light'};
        if(message == null){
            return false;
        }
        return (
            <Page title="服务提醒" history={history} others={page}>
            <List className="my-list">
                {(message.data.data).length!=0?message.data.data.map((item,index)=>(
                    <Item align="top" thumb={item.uri} multipleLine>
                        {item.title} <Brief>{item.message}</Brief><Brief>{item.created_at}</Brief>
                    </Item>
                ))
                :
                <p className='txt-c txt-color-assist no-data' style={{background:'#F5F5F5'}}>无相关数据</p>
            }
                {/* {Message.message!=null ? (Message.message.data.data.length==0?<p className='txt-c txt-color-assist no-data'>无相关数据</p>:
                          message.data.map((item,index)=>(
                            
                                
                          )))
                          :
                          ''
                } */}
            </List>
            </Page>
        )
    }
}
export default Index;