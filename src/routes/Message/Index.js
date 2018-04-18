import React , {Component} from 'react';
import { connect } from 'dva';
import {List} from 'antd-mobile'

import Header from '../../components/Other/Header';
import Page from '../../components/Page'
const Item = List.Item;
const Brief = List.Brief
@connect(state=>({
    Message:state.index
}))
class Index extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({
            type:'index/messages',
            payload:{page:1,per_page:2}
        })
    }
    render(){
        console.log(this.props)
        const { history,Message } = this.props;

        return (
            <Page title="服务提醒" history={history} >
            <List className="my-list">
                {Message.message!=null ? (Message.message.data.data.length==0?<p className='txt-c txt-color-assist no-data'>无相关数据</p>:
                          Message.message.data.data.map((item,index)=>(
                            
                                <Item align="top" thumb={item.uri} multipleLine>
                                    {item.title} <Brief>{item.message}</Brief><Brief>{item.created_at}</Brief>
                                </Item>
                          )))
                          :
                          ''
                }
            </List>
            </Page>
        )
    }
}
export default Index;